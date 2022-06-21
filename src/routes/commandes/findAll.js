const { Commande } = require('../../db/sequelize')
//const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/commandes', (req, res) => {
        Commande.findAll()
        .then(commandes => {
            const message = 'La liste des commandes a bien été récupérée.'
            res.json({ message, data: commandes })
        })
        .catch(err => {
            const message = `La liste des commandes n'a pas pu être récupérée. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}