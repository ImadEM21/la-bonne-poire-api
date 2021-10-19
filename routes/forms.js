const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

router.get('/forms', auth, authorize(['admin']));
router.post('/forms');
router.get('/forms/:id', auth, authorize(['admin']));
router.delete('/forms/:id', auth, authorize(['admin']));

module.exports = router;