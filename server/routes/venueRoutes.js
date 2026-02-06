const express = require('express');
const router = express.Router();
const { getVenues, getVenueBySlug, createVenue, updateVenue, deleteVenue } = require('../controllers/venueController');
const auth = require('../middleware/authMiddleware');

router.get('/', getVenues);
router.get('/:slug', getVenueBySlug);
router.post('/', auth, createVenue);
router.put('/:id', auth, updateVenue);
router.delete('/:id', auth, deleteVenue);

module.exports = router;
