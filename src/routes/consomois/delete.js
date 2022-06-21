const { ConsoMois } = require('../../db/sequelize')
//const auth = require('../auth/auth')
  
module.exports = (app) => {
    app.delete('/api/consomois/:id', (req, res) => {
        ConsoMois.findByPk(req.params.id)
        .then(mois => {
            //gestion de l'erreur 404
            if(mois === null) {
                const message = `Le ConsoMois demandé n'existe pas. Réessayez avec un autre id.`
                return res.status(404).json({message})
            }
            //ressource presente - status : 200
            const moisDeleted = mois
            
            return ConsoMois.destroy({where: { id: mois.id }})
            .then(_ => {
                const message = `Le ConsoMois avec l'id: ${moisDeleted.id} a bien été supprimé.`
                res.json({message, data: moisDeleted })
            })
        })
        .catch(err => {
            const message = `Le ConsoMois n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}