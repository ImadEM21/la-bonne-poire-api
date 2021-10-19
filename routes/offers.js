const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

router.get('/offers', auth, authorize(['user', 'admin']));
router.post('/offers', auth, authorize(['user', 'admin']));
router.get('/offers/:id', auth, authorize(['user', 'admin']));
router.put('/offers/:id', auth, authorize(['user', 'admin']));
router.delete('/offers/:id', auth, authorize(['user', 'admin']));

module.exports = router;