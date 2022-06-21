const { Membre } = require('../../db/sequelize')
//const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/membres/:id', (req, res) => {
        Membre.findByPk(req.params.id)
        .then(membre => {
            //gestion de l'erreur 404
            if(membre === null) {
                const message = `Le membre demandé n'existe pas. Réessayez avec un autre id.`
                return res.status(404).json({message})
            }
            //ressource presente - status : 200
            const message = 'Un membre a bien été trouvé.'
            res.json({ message, data: membre })
        })
        .catch(err => {
            const message = `Le membre n'a pas pu être récupéré. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}