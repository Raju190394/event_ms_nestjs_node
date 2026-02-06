const pool = require('../config/db');
const path = require('path');

exports.getGallery = async (req, res, next) => {
    try {
        console.log('GET /api/gallery called');
        const [rows] = await pool.query('SELECT * FROM gallery ORDER BY created_at DESC');

        const data = rows.map(item => {
            let url = item.media_url || '';
            if (url && !url.startsWith('http')) {
                url = `${req.protocol}://${req.get('host')}/${url.replace(/\\/g, '/')}`;
            }
            return {
                ...item,
                media_url: url
            };
        });

        res.status(200).json({ success: true, count: data.length, data });
    } catch (err) {
        console.error('getGallery Error:', err);
        next(err);
    }
};

exports.addToGallery = async (req, res, next) => {
    try {
        console.log('POST /api/gallery - Body:', req.body);
        if (req.file) console.log('POST /api/gallery - File:', req.file);

        const { title, media_url, media_type, category, is_featured } = req.body;

        let finalMediaUrl = media_url;

        if (req.file) {
            // Store as relative path 'uploads/gallery/filename.ext'
            const filename = req.file.filename;
            finalMediaUrl = `uploads/gallery/${filename}`;
        }

        if (!finalMediaUrl) {
            return res.status(400).json({ success: false, message: 'Please provide a URL or upload an image' });
        }

        const [result] = await pool.query(
            'INSERT INTO gallery (title, media_url, media_type, category, is_featured) VALUES (?, ?, ?, ?, ?)',
            [title || 'Untitled', finalMediaUrl, media_type || 'image', category || 'General', is_featured === 'true' || is_featured === true]
        );

        const newUrl = finalMediaUrl.startsWith('http') ? finalMediaUrl : `${req.protocol}://${req.get('host')}/${finalMediaUrl.replace(/\\/g, '/')}`;

        res.status(201).json({
            success: true,
            data: {
                id: result.insertId,
                title: title || 'Untitled',
                media_url: newUrl,
                media_type: media_type || 'image',
                category: category || 'General',
                is_featured: is_featured === 'true' || is_featured === true
            }
        });
    } catch (err) {
        console.error('addToGallery Error:', err);
        next(err);
    }
};

exports.deleteFromGallery = async (req, res, next) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM gallery WHERE id = ?', [id]);
        res.status(200).json({ success: true, message: 'Media deleted from gallery' });
    } catch (err) {
        console.error('deleteFromGallery Error:', err);
        next(err);
    }
};
