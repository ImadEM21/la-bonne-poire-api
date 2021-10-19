const express = require('express');
const router = express.Router();

const controller = require('../controllers/adverts');

const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
const multer = require('../middlewares/multer-advert-config');

router.get('/adverts', controller.getAdverts);
router.post('/adverts', auth, authorize(['user', 'admin']), multer, controller.createAdvert);
router.get('/adverts/:id', controller.getAdvert);
router.put('/adverts/:id', auth, authorize(['user', 'admin']), multer, controller.updateAdvert);
router.delete('/adverts/:id', auth, authorize(['user', 'admin']), controller.deleteAdvert);

module.exports = router;