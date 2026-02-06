const express = require('express');
const router = express.Router();
const { getGallery, addToGallery, deleteFromGallery } = require('../controllers/galleryController');
const auth = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

router.get('/', getGallery);
router.post('/', auth, upload.single('image'), addToGallery);
router.delete('/:id', auth, deleteFromGallery);

module.exports = router;
