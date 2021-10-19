const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

router.get('/messages', auth, authorize(['user']));
router.post('/messages', auth, authorize(['user']));
router.get('/messages/:id', auth, authorize(['user']));
router.put('/messages/:id', auth, authorize(['user']));
router.delete('/messages/:id', auth, authorize(['user']));

module.exports = router;