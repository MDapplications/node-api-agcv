const { ConsoVolant } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
    app.post('/api/consovolants', auth, (req, res) => {
        ConsoVolant.create(req.body)
        .then(consovolant => {
            const message = `La consomation de volant a bien été crée.`
            res.json({ message, data: consovolant })
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                return res.status(400).json({message: err.message, data: err})
            }
            if (err instanceof UniqueConstraintError) {
                return res.status(400).json({message: err.message, data: err})
            }
            const message = `La consomation de volant n'a pas pu être ajouté. Réessayez dans quelques instants.`
            res.status(500).json({message, data: error})
        })
    })
}