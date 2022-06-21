const { Commande } = require('../../db/sequelize')
//const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/commandes/:id', (req, res) => {
        Commande.findByPk(req.params.id)
        .then(commande => {
            //gestion de l'erreur 404
            if(commande === null) {
                const message = `La commande demandé n'existe pas. Réessayez avec un autre id.`
                return res.status(404).json({message})
            }
            //ressource presente - status : 200
            const message = 'Une commande a bien été trouvé.'
            res.json({ message, data: commande })
        })
        .catch(err => {
            const message = `La commande n'a pas pu être récupéré. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}