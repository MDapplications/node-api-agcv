const { TypeVolant } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/typevolants/:id', auth, (req, res) => {
        TypeVolant.findByPk(req.params.id)
        .then(typevolant => {
            //gestion de l'erreur 404
            if(typevolant === null) {
                const message = `Le type de volant demandé n'existe pas. Réessayez avec un autre id.`
                return res.status(404).json({message})
            }
            //ressource presente - status : 200
            const message = 'Un type de volant a bien été trouvé.'
            res.json({ message, data: typevolant })
        })
        .catch(err => {
            const message = `Le type de volant n'a pas pu être récupéré. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}