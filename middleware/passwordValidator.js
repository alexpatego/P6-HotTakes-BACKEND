const passwordValidator = require('password-validator')

const passwordSchema = new passwordValidator()

passwordSchema
.is().min(5)                                    // Minimum length 5
.is().max(30)                                   // Maximum length 30
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

module.exports = (req, res, next) => {
    passwordSchema.validate(req.body.password) ? next() : res.status(400).json({ error: `Mot de passe trop faible : ${passwordSchema.validate(req.body.password, { list: true })}` })
}