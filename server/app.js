const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Folders
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Root Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Event Management System API' });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/venues', require('./routes/venueRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

module.exports = app;
