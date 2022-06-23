const { TypeTube } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/typetubes/:id', auth, (req, res) => {
        TypeTube.findByPk(req.params.id)
        .then(typetube => {
            //gestion de l'erreur 404
            if(typetube === null) {
                const message = `Le type de tube demandé n'existe pas. Réessayez avec un autre id.`
                return res.status(404).json({message})
            }
            //ressource presente - status : 200
            const message = 'Un type de tube a bien été trouvé.'
            res.json({ message, data: typetube })
        })
        .catch(err => {
            const message = `Le type de tube n'a pas pu être récupéré. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}