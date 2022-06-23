const { Restock } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/restocks/:id', auth, (req, res) => {
        Restock.findByPk(req.params.id)
        .then(restock => {
            //gestion de l'erreur 404
            if(restock === null) {
                const message = `Le restock demandé n'existe pas. Réessayez avec un autre id.`
                return res.status(404).json({message})
            }
            //ressource presente - status : 200
            const message = 'Un restock a bien été trouvé.'
            res.json({ message, data: restock })
        })
        .catch(err => {
            const message = `Le restock n'a pas pu être récupéré. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}