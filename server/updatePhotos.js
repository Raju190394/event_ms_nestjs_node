const pool = require('./config/db');

async function updatePhotos() {
    try {
        console.log('Updating project with premium high-quality photos...');

        // 1. Update Events
        await pool.query("UPDATE events SET image_url = 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop' WHERE slug = 'wedding-events'");
        await pool.query("UPDATE events SET image_url = 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=2064&auto=format&fit=crop' WHERE slug = 'birthday-parties'");
        await pool.query("UPDATE events SET image_url = 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop' WHERE slug = 'corporate-events'");

        // 2. Update Services
        await pool.query("UPDATE services SET image_url = 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop' WHERE slug = 'catering-services' OR slug = 'catering'");
        await pool.query("UPDATE services SET image_url = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop' WHERE slug = 'dj-music'");
        await pool.query("UPDATE services SET image_url = 'https://images.unsplash.com/photo-1519225421980-715cb021e1ed?q=80&w=2070&auto=format&fit=crop' WHERE slug = 'decor-floral' OR slug = 'decorations'");

        // 3. Update Gallery (Insert fresh samples)
        await pool.query("DELETE FROM gallery");
        const galleryItems = [
            ['Classic Hindu Wedding', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069', 'image', 'Wedding', 1],
            ['Modern Corporate Setup', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012', 'image', 'Corporate', 1],
            ['Vibrant Stage Decor', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070', 'image', 'General', 1],
            ['Fine Dining Setup', 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070', 'image', 'General', 0]
        ];
        for (const item of galleryItems) {
            await pool.query("INSERT INTO gallery (title, media_url, media_type, category, is_featured) VALUES (?, ?, ?, ?, ?)", item);
        }

        console.log('✅ All photos updated to high-quality professional versions!');
    } catch (err) {
        console.error('❌ Error updating photos:', err.message);
    } finally {
        process.exit();
    }
}

updatePhotos();
