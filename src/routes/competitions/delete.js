const { Competition } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
    app.delete('/api/competitions/:id', auth, (req, res) => {  // '/api/pokemons/:id', auth, (req, res)
        Competition.findByPk(req.params.id)
        .then(competition => {
            //gestion de l'erreur 404
            if(competition === null) {
                const message = `La competition demandé n'existe pas. Réessayez avec un autre id.`
                return res.status(404).json({message})
            }
            //ressource presente - status : 200
            const competitionDeleted = competition
            
            return Competition.destroy({where: { id: competition.id }})
            .then(_ => {
                const message = `La competition avec l'id: ${competitionDeleted.id} a bien été supprimé.`
                res.json({message, data: competitionDeleted })
            })
        })
        .catch(err => {
            const message = `La competition n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}