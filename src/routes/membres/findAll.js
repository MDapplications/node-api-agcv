const { Membre, Commande } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/membres', auth, (_, res) => {
        
        Membre.findAll()
        .then(membres => {
            const message = 'La liste des membres a bien été récupérée.'
            res.json({ message, data: membres })
        })
        .catch(err => {
            const message = `La liste des membres n'a pas pu être récupérée. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}