const Sauce = require('../models/Sauce')
const fs = require('fs')

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject.userId;
    const sauce = new Sauce({
      ...sauceObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
        
        // vérifier l'id de l'auteur du post
        if (sauce.userId != req.auth.userId) {
            res.status(401).json({message: 'Non-autorisé'})
        } 

        //MAJ du fichier dans le dossier images en cas de modif et suppression
        
        if (req.file) {
            Sauce.findOne({_id: req.params.id})
            .then(sauce => {
                const filename = sauce.imageUrl.split('/images/')[1];
                
                fs.unlink(`images/${filename}`, (error) => {
                    if (error) throw error
                })
            })
            .catch(error => res.status(400).json({error}))
        }
        
        //MAJ de la sauce
        const sauceObject = req.file ? {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
        delete sauceObject.userId
        
        Sauce.updateOne({_id: req.params.id}, { ...sauceObject, _id: req.params.id})
            .then(()=> res.status(200).json({ message: 'Objet modifié'}))
            .catch(error => res.status(401).json({ error }))

    })
    .catch(error => res.status(400).json({ error }))
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            if(sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé'});
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                        .catch(error => res.status(400).json({ error }));
                }) 
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error}));
    console.log("Sauces récupérées")
};