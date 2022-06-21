const { ConsoMois } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
//const auth = require('../auth/auth')
  
module.exports = (app) => {
    app.post('/api/consomois', (req, res) => {
        ConsoMois.create(req.body)
        .then(mois => {
            const message = `Le consoMois de ${req.body.name} a bien été crée.`
            res.json({ message, data: mois })
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                return res.status(400).json({message: err.message, data: err})
            }
            if (err instanceof UniqueConstraintError) {
                return res.status(400).json({message: err.message, data: err})
            }
            const message = `La consoMois n'a pas pu être ajouté. Réessayez dans quelques instants.`
            res.status(500).json({message, data: error})
        })
    })
}