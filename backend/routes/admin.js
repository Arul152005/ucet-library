const express = require('express');
const router = express.Router();
const { authAdmin, registerAdmin, getAdminProfile } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/admin/login - Authenticate admin
router.post('/login', authAdmin);

// POST /api/admin/register - Register a new admin
router.post('/register', registerAdmin);

// GET /api/admin/profile - Get admin profile (protected route)
router.get('/profile', protect, getAdminProfile);

module.exports = router;