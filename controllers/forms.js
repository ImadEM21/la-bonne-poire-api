const Form = require('../models/Form');

exports.getForms = (req, res) => {
    Form.find().sort({createdAt: 'desc'})
    .then(forms => {
        if (!forms) return res.status(404).json({message: "Aucun message via formulaire de contact n'a encore été envoyé"});
        return res.status(200).json({forms});
    })
    .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
};

exports.getForm = (req, res) => {
    Form.findById(req.params.id)
    .then(form => {
        if (!form) return res.status(404).json({message: "Ce formulaire n'existe pas"});
        return res.status(200).json({form});
    })
    .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
};

exports.createForm = (req, res) => {
    const form = new Form({
        ...req.body
    });
    form.save()
    .then(form => res.status(201).json({form}))
    .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
};

exports.deleteForm = (req, res) => {
    Form.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({message: "Message supprimé avec succès"}))
    .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
};