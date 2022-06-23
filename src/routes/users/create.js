const { User } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (app) => {
    app.post('/api/users', (req, res) => {
        
        const {username, password, role, actif} = req.body

        bcrypt.hash(password, 10)
        .then(hash => {
            User.create({
                username,
                password: hash,
                role,
                actif
            })
            .then(user => {
                const message = `L'utilisateur a bien été crée.`
                res.json({ message, data: user })
            })
            .catch(err => {
                if (err instanceof ValidationError) {
                    return res.status(400).json({message: err.message, data: err})
                }
                if (err instanceof UniqueConstraintError) {
                    return res.status(400).json({message: err.message, data: err})
                }
                const message = `L'utilisateur n'a pas pu être ajouté. Réessayez dans quelques instants.`
                res.status(500).json({message, data: err})
            })
        })
        
    })
}