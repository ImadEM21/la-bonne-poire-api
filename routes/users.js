const express = require('express');
const router = express.Router();

const controller = require('../controllers/users');

const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
const multer = require('../middlewares/multer-user-config');

router.post('/users/signup', multer, controller.signup);
router.post('/users/login', controller.login);
router.get('/users', auth, authorize(['admin']), controller.getUsers);
router.post('/users', auth, authorize(['admin']), multer, controller.createUser);
router.get('/users/:id', auth, authorize(['user', 'admin']), controller.getUser);
router.put('/users/:id', auth, authorize(['user', 'admin']), multer, controller.updateUser);
router.delete('/users/:id', auth, authorize(['user', 'admin']), controller.deleteUser);

module.exports = router;