const express = require('express');
const router = express.Router();
const { createInquiry, getInquiries, updateInquiryStatus } = require('../controllers/inquiryController');
const auth = require('../middleware/authMiddleware');
const { validateInquiry } = require('../middleware/validators');

router.post('/', validateInquiry, createInquiry);
router.get('/', auth, getInquiries);
router.put('/:id', auth, updateInquiryStatus);

module.exports = router;
