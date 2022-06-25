const { ConsoVolant } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/typevolants/:id', auth, (req, res) => {
        ConsoVolant.findByPk(req.params.id)
        .then(consovolant => {
            //gestion de l'erreur 404
            if(consovolant === null) {
                const message = `La consommation de volant demandé n'existe pas. Réessayez avec un autre id.`
                return res.status(404).json({message})
            }
            //ressource presente - status : 200
            const message = 'Une consommation de volant a bien été trouvé.'
            res.json({ message, data: consovolant })
        })
        .catch(err => {
            const message = `La consommation de volant n'a pas pu être récupéré. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}