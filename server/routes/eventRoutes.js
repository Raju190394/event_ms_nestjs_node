const express = require('express');
const router = express.Router();
const { getEvents, getEventBySlug, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const auth = require('../middleware/authMiddleware');

router.get('/', getEvents);
router.get('/:slug', getEventBySlug);
router.post('/', auth, createEvent);
router.put('/:id', auth, updateEvent);
router.delete('/:id', auth, deleteEvent);

module.exports = router;
