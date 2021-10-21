const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = req.file ? new User({
            ...req.body,
            avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            password: hash
        }) : new User ({
            ...req.body,
            password: hash
        });
        user.save()
        .then(user => {
            return res.status(201).json({
                user,
                userId: user._id,
                role: user.role,
                token: jwt.sign(
                    {userId: user._id, role: user.role},
                    process.env.TOKEN,
                    {expiresIn: '72h'}
                )
            });
        })
        .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
    })
    .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
};

exports.login = (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (!user) return res.status(404).json({message: "Cet utilisateur n'existe pas"})
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) return res.status(401).json({message: "Mot de passe incorrect"});
            return res.status(200).json({
                user,
                userId: user._id,
                role: user.role,
                token: jwt.sign(
                    {userId: user._id, role: user.role},
                    process.env.TOKEN,
                    {expiresIn: '72h'}
                )
            })
        })
        .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
    })
    .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
};

exports.createUser = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = req.file ? new User({
            ...req.body,
            avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            password: hash
        }) : new User({
            ...req.body,
            password: hash
        });
        user.save()
        .then(user => res.status(201).json({user}))
        .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
    })
    .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
}

exports.getUsers = (req, res) => {
    User.find().sort({createdAt: 'desc'})
    .then(users => {
        if (!users) return res.status(404).json({message: "Aucun utilisateur trouvé"});
        return res.status(200).json({users});
    })
    .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
};

exports.getUser = (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if (!user) return res.status(404).json({message: "Aucun utilisateur trouvé"});
        return res.status(200).json({user});
    })
    .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
};

exports.updateUser = (req, res) => {
    if (req.file) {
        if (req.body.oldPassword && req.body.password) {
            User.findById(req.params.id)
            .then(user => {
                if (!user) return res.status(404).json({message: "Utilisateur introuvable"});
                bcrypt.compare(req.body.oldPassword, user.password)
                .then(valid => {
                    if (!valid) return res.status(401).json({message: "Mot de passe incorrect"});
                    bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const filename = user.avatar.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => {
                            const newUser = {
                                ...req.body,
                                avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                                password: hash
                            };
                            User.findByIdAndUpdate(req.params.id, { ...newUser, _id: req.params.id })
                            .then(user => res.status(200).json({user}))
                            .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
                        });
                    })
                    .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
                })
                .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}))
            })
            .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
        } else {
            User.findById(req.params.id)
            .then(user => {
                const filename = user.avatar.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    const newUser = {
                        ...req.body,
                        avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    };
                    User.findByIdAndUpdate(req.params.id, { ...newUser, _id: req.params.id })
                    .then(user => res.status(200).json({user}))
                    .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
                })
            })
            .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
        }
    } else {
        if (req.body.password && req.body.oldPassword) {
            User.findById(req.params.id)
            .then(user => {
                if (!user) return res.status(404).json({message: "Utilisateur introuvable"});
                bcrypt.compare(req.body.oldPassword, user.password)
                .then(valid => {
                    if (!valid) return res.status(401).json({message: "Mot de passe incorrect"});
                    bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const newUser = {
                            ...req.body,
                            password: hash
                        };
                        User.findByIdAndUpdate(req.params.id, { ...newUser, _id: req.params.id })
                        .then(user => res.status(200).json({user}))
                        .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
                    })
                    .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
                })
                .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
            })
            .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
        } else {
            const newUser = {
                ...req.body
            };
            User.findByIdAndUpdate(req.params.id, { ...newUser, _id: req.params.id })
            .then(user => res.status(200).json({user}))
            .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
        }
    }
};

exports.deleteUser = (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        const filename = user.avatar.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            User.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).json({message: "Utilisateur supprimé"}))
            .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
        })
    })
    .catch(error => res.status(400).json({error: error.stack.split('\n')[0]}));
};