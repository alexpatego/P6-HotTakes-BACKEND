const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

const User = require('../models/user')

exports.signup = (req, res) => {
    // hash le mdp / sur 10 rounds
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            // enregistre le nouvel utilisateur
            user.save()
                .then(() => res.status(201).json({message: 'Utilisateur créé avec succès!'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
    };

exports.login = (req, res) => {
    // retrouve l'utilisateur crée
    User.findOne({ email: req.body.email})
        .then(user => {
            if (user === null) {
                res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'})
            } else {
                // compare le mdp de la base de données avec celui rentré
                bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        res.status(400).json({message: 'Paire identifiant/mot de passe incorrecte'})
                    } else {
                        // création d'un token
                        res.status(200).json({
                            userId: user._id,
                            token: jwt.sign(
                                { userId: user._id},
                                'RANDOM_TOKEN_SECRET',
                                { expiresIn: '24h' }
                            )
                        });
                    }
                })
                .catch(error => res.status(500).json({ error}))
            }
        })
        .catch(error => res.status(500).json({ error }))
    };