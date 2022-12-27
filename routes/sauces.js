const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

const saucesCtrl = require('../controllers/sauces')
const likeCtrl = require('../controllers/like')

// Crée une sauce + auth de sécurité + multer pour les images
router.post('/', auth, multer, saucesCtrl.createSauce);
// Route pour les likes/dislikes
router.post('/:id/like', auth, likeCtrl.likeSauce);
// Modifie une sauce
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
// Supprime une sauce
router.delete('/:id', auth, saucesCtrl.deleteSauce);
// Récupère une sauce par son id
router.get('/:id', auth, saucesCtrl.getOneSauce);
// Récupère toutes les sauces
router.get('/', auth, saucesCtrl.getAllSauces);

module.exports = router;