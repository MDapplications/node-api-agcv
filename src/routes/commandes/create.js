const { Commande } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
//const auth = require('../auth/auth')
  
module.exports = (app) => {
    app.post('/api/commandes', (req, res) => {
        Commande.create(req.body)
        .then(commande => {
            const message = `La commande a bien été crée.`
            res.json({ message, data: commande })
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                return res.status(400).json({message: err.message, data: err})
            }
            if (err instanceof UniqueConstraintError) {
                return res.status(400).json({message: err.message, data: err})
            }
            const message = `La commande n'a pas pu être ajouté. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}