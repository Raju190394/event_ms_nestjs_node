const pool = require('../config/db');

// Create Booking with Inventory Allocation
exports.createBooking = async (req, res, next) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const {
            customer_name, customer_email, customer_phone,
            event_id, venue_id, custom_location, booking_date, guest_count,
            additional_services, total_amount, items
        } = req.body;

        // 1. Insert Booking
        const [bookingResult] = await connection.query(
            `INSERT INTO bookings (customer_name, customer_email, customer_phone, event_id, venue_id, custom_location, booking_date, guest_count, additional_services, total_amount, status) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed')`,
            [customer_name, customer_email, customer_phone, event_id, venue_id || null, custom_location || null, booking_date, guest_count, JSON.stringify(additional_services), total_amount]
        );

        const bookingId = bookingResult.insertId;

        // 2. Handle Inventory Items
        if (items && items.length > 0) {
            for (const item of items) {
                const { item_id, quantity } = item;

                // Check availability
                const [itemData] = await connection.query('SELECT available_stock, name FROM inventory_items WHERE id = ? FOR UPDATE', [item_id]);

                if (itemData[0].available_stock < quantity) {
                    throw new Error(`Insufficient stock for ${itemData[0].name}. Only ${itemData[0].available_stock} available.`);
                }

                // Deduct from inventory
                await connection.query('UPDATE inventory_items SET available_stock = available_stock - ? WHERE id = ?', [quantity, item_id]);

                // Record in booking_inventory
                await connection.query(
                    'INSERT INTO booking_inventory (booking_id, item_id, quantity, price_at_booking) VALUES (?, ?, ?, (SELECT base_price FROM inventory_items WHERE id = ?))',
                    [bookingId, item_id, quantity, item_id]
                );
            }
        }

        await connection.commit();
        res.status(201).json({ success: true, bookingId, message: 'Booking created and inventory allocated' });

    } catch (err) {
        await connection.rollback();
        console.error('Booking Error:', err.message);
        res.status(400).json({ success: false, message: err.message });
    } finally {
        connection.release();
    }
};

// Get All Bookings with Items
exports.getBookings = async (req, res, next) => {
    try {
        const [rows] = await pool.query(`
            SELECT b.*, e.name as event_name, v.name as venue_name 
            FROM bookings b
            LEFT JOIN events e ON b.event_id = e.id
            LEFT JOIN venues v ON b.venue_id = v.id
            ORDER BY b.booking_date DESC
        `);

        // Fetch items for each booking (could be optimized with a join/grouping)
        const bookingsWithItems = await Promise.all(rows.map(async (b) => {
            const [items] = await pool.query(`
                SELECT bi.*, i.name, i.unit_type 
                FROM booking_inventory bi
                JOIN inventory_items i ON bi.item_id = i.id
                WHERE bi.booking_id = ?
            `, [b.id]);
            return { ...b, items };
        }));

        res.status(200).json({ success: true, data: bookingsWithItems });
    } catch (err) {
        next(err);
    }
};

// Complete Booking (Return Items to Inventory)
exports.updateBookingStatus = async (req, res, next) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { id } = req.params;
        const { status } = req.body; // e.g., 'completed' or 'cancelled'

        // Get current status
        const [current] = await connection.query('SELECT status FROM bookings WHERE id = ?', [id]);
        if (!current.length) throw new Error('Booking not found');

        const oldStatus = current[0].status;

        // If shifting to completed or cancelled from confirmed/pending, return items
        if ((status === 'completed' || status === 'cancelled') && (oldStatus === 'confirmed' || oldStatus === 'pending')) {
            const [items] = await connection.query('SELECT item_id, quantity FROM booking_inventory WHERE booking_id = ?', [id]);

            for (const item of items) {
                await connection.query('UPDATE inventory_items SET available_stock = available_stock + ? WHERE id = ?', [item.quantity, item.item_id]);
            }
        }

        await connection.query('UPDATE bookings SET status = ? WHERE id = ?', [status, id]);

        await connection.commit();
        res.status(200).json({ success: true, message: `Booking marked as ${status} and items ${status === 'completed' ? 'returned' : 'released'}` });

    } catch (err) {
        await connection.rollback();
        res.status(400).json({ success: false, message: err.message });
    } finally {
        connection.release();
    }
};
