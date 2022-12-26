const emailValidator = require('validator')

module.exports = (req, res, next) => {
    const { email } = req.body;

    emailValidator.isEmail(email) ? next() : res.status(400).json({ error: 'Email non valide !' })
}