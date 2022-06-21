const { ConsoMois } = require('../../db/sequelize')
//const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/consomois/:id', (req, res) => {
        ConsoMois.findByPk(req.params.id)
        .then(mois => {
            //gestion de l'erreur 404
            if(mois === null) {
                const message = `Le ConsoMois demandé n'existe pas. Réessayez avec un autre id.`
                return res.status(404).json({message})
            }
            //ressource presente - status : 200
            const message = 'Un ConsoMois a bien été trouvé.'
            res.json({ message, data: mois })
        })
        .catch(err => {
            const message = `Le ConsoMois n'a pas pu être récupéré. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}