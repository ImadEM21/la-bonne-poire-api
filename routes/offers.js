const express = require('express');
const router = express.Router();

const controller = require('../controllers/offers');

const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

router.get('/offers', auth, authorize(['user', 'admin']), controller.getAllOffers);
router.get('/offers/user/:id', auth, authorize(['user', 'admin']), controller.getUserOffers);
router.post('/offers', auth, authorize(['user', 'admin']), controller.createOffer);
router.get('/offers/:id', auth, authorize(['user', 'admin']), controller.getOffer);
router.put('/offers/:id', auth, authorize(['user', 'admin']), controller.updateOffer);
router.delete('/offers/:id', auth, authorize(['user', 'admin']), controller.deleteOffer);

module.exports = router;