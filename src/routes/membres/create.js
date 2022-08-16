const { Membre } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
    app.post('/api/membres', auth, (req, res) => {
        Membre.create(req.body)
        .then(membre => {
            const message = `La membre ${req.body.prenom} ${req.body.nom} a bien été crée.`
            res.json({ message, data: membre })
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                return res.status(400).json({message: err.message, data: err})
            }
            if (err instanceof UniqueConstraintError) {
                return res.status(400).json({message: err.message, data: err})
            }
            const message = `La saison n'a pas pu être ajouté. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}