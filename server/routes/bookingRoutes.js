const express = require('express');
const router = express.Router();
const { createBooking, getBookings, updateBookingStatus } = require('../controllers/bookingController');
const auth = require('../middleware/authMiddleware');

router.post('/', createBooking); // Publicly accessible or auth? User says "booking compile time", usually admin or registered client.
router.get('/', auth, getBookings);
router.put('/:id/status', auth, updateBookingStatus);

module.exports = router;
