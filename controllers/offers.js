const Offer = require('../models/Offer');

exports.createOffer = (req, res) => {
    const offer = new Offer({
        ...req.body
    });
    offer.save()
    .then(offer => res.status(201).json({offer}))
    .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
};

exports.getUserOffers = (req, res) => {
    const offers = {
        sent: null,
        recieved: null
    };
    Offer.find({from: req.params.id}).sort({createdAt: 'desc'})
    .populate("advert")
    .populate("to")
    .exec((error, sentOffers) => {
        if (error) return res.status(400).json({error: error.stack.split('\n')[0]});
        offers.sent = sentOffers;
        Offer.find({to: req.params.id}).sort({createdAt: 'desc'})
        .populate('from')
        .populate("advert")
        .exec((error, recievedOffers) => {
            if (error) return res.status(400).json({error: error.stack.split('\n')[0]});
            offers.recieved = recievedOffers;
            return res.status(200).json({offers});
        })
    });
}

exports.getAllOffers = (req, res) => {
    Offer.find().sort({createdAt: 'desc'})
    .then(offers => res.status(200).json({offers}))
    .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
};

exports.getOffer = (req, res) => {
    Offer.findById(req.params.id)
    .then(offer => res.status(200).json({offer}))
    .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
};

exports.updateOffer = (req, res) => {
    const newOffer = {
        ...req.body
    };
    Offer.findByIdAndUpdate(req.params.id, { ...newOffer, _id: req.params.id }, {new: true})
    .then(offer => res.status(200).json({offer}))
    .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
};

exports.deleteOffer = (req, res) => {
    Offer.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({message: "Offre bien supprimé"}))
    .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
};
