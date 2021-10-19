const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
const multer = require('../middlewares/multer-user-config');

router.post('/users/signup', multer);
router.post('/users/login');
router.get('/users', auth, authorize(['admin']));
router.post('/users', auth, authorize(['admin']), multer);
router.get('/users/:id', auth, authorize(['user', 'admin']));
router.put('/users/:id', auth, authorize(['user', 'admin']), multer);
router.delete('/users/:id', auth, authorize(['user', 'admin']));

module.exports = router;