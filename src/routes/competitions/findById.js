const { Competition, TypeTube } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/competitions/:id', auth, (req, res) => {
        Competition.findByPk(req.params.id, {include: TypeTube})
        .then(compet => {
            //gestion de l'erreur 404
            if(compet === null) {
                const message = `La competition demandé n'existe pas. Réessayez avec un autre id.`
                return res.status(404).json({message})
            }
            //ressource presente - status : 200
            const message = 'Une competition a bien été trouvé.'
            res.json({ message, data: compet })
        })
        .catch(err => {
            const message = `La competition n'a pas pu être récupéré. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}