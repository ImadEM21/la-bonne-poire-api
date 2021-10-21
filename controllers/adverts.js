const Advert = require('../models/Advert');
const fs = require('fs');

exports.getAdverts = (req, res) => {
    Advert.find().sort({createdAt: 'desc'})
    .then(adverts => {
        if (!adverts) return res.status(404).json({message: "Aucune annonce trouvée"});
        return res.status(200).json({adverts});
    })
    .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
};

exports.getAdvert = (req, res) => {
    Advert.findById(req.params.id)
    .populate("owner")
    .exec((error, advert) => {
        if (error) return res.status(400).json({error: error.stack.split('\n')[0]});
        if (!advert) return res.status(404).json({message: "Aucune annonce trouvée"})
        return res.status(200).json({advert});
    });
};

exports.createAdvert = (req, res) => {
    const advert = new Advert({
        ...req.body,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    advert.save()
    .then(advert => res.status(201).json({advert}))
    .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
};

exports.updateAdvert = (req, res) => {
    if (req.file) {
        Advert.findById(req.params.id)
        .then(advert => {
            const filename = advert.image.split('/images/')[1];  
            fs.unlink(`images/${filename}`, () => {
                const newAdvert = {
                    ...req.body,
                    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                };
                Advert.findByIdAndUpdate(req.params.id, { ...newAdvert, _id: req.params.id }, {new: true})
                .then(advert => res.status(200).json({advert}))
                .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}))
            });
        })
        .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
    } else {
        const newAdvert = {
            ...req.body
        };
        Advert.findByIdAndUpdate(req.params.id, { ...newAdvert, _id: req.params.id }, {new: true})
        .then(advert => res.status(200).json({advert}))
        .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
    }
};

exports.deleteAdvert = (req, res) => {
    Advert.findById(req.params.id)
    .then(advert => {
        const filename = advert.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
            Advert.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).json({message: "Annonce supprimée correctement"}))
            .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
        });
    })
    .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
};