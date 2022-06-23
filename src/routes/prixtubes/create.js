const { PrixTube } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
    app.post('/api/prixtubes', auth, (req, res) => {
        PrixTube.create(req.body)
        .then(prixtube => {
            const message = `Le prix du tube de la marque: "${req.body.marque}" a bien été crée.`
            res.json({ message, data: prixtube })
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                return res.status(400).json({message: err.message, data: err})
            }
            if (err instanceof UniqueConstraintError) {
                return res.status(400).json({message: err.message, data: err})
            }
            const message = `Le prix du tube n'a pas pu être ajouté. Réessayez dans quelques instants.`
            res.status(500).json({message, data: error})
        })
    })
}