const { TypeVolant } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
    app.post('/api/typevolants', auth, (req, res) => {
        TypeVolant.create(req.body)
        .then(typevolant => {
            const message = `Le TypeVolant a bien été crée.`
            res.json({ message, data: typevolant })
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                return res.status(400).json({message: err.message, data: err})
            }
            if (err instanceof UniqueConstraintError) {
                return res.status(400).json({message: err.message, data: err})
            }
            const message = `Le TypeVolant n'a pas pu être ajouté. Réessayez dans quelques instants.`
            res.status(500).json({message, data: error})
        })
    })
}