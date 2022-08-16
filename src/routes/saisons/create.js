const { Saison } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
    app.post('/api/saisons', auth, (req, res) => {
        Saison.create(req.body)
        .then(saison => {
            const message = `La saison ${req.body.anneeDebut} - ${req.body.anneeFin} a bien été crée.`
            res.json({ message, data: saison })
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