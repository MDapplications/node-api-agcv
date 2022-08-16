const { Stock } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
    app.post('/api/stocks', auth, (req, res) => {
        Stock.create(req.body)
        .then(saison => {
            const message = `Le stock a bien été créé.`
            res.json({ message, data: saison })
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                return res.status(400).json({message: err.message, data: err})
            }
            if (err instanceof UniqueConstraintError) {
                return res.status(400).json({message: err.message, data: err})
            }
            const message = `Le stock n'a pas pu être ajouté. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}