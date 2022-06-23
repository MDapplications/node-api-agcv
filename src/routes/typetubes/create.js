const { TypeTube } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
    app.post('/api/typetubes', auth, (req, res) => {
        TypeTube.create(req.body)
        .then(typetube => {
            const message = `Le TypeTube ${req.body.name} (${req.body.usage}) a bien été crée.`
            res.json({ message, data: typetube })
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                return res.status(400).json({message: err.message, data: err})
            }
            if (err instanceof UniqueConstraintError) {
                return res.status(400).json({message: err.message, data: err})
            }
            const message = `Le TypeTube n'a pas pu être ajouté. Réessayez dans quelques instants.`
            res.status(500).json({message, data: error})
        })
    })
}