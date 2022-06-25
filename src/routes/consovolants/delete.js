const { ConsoVolant } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
    app.delete('/api/consovolants/:id', auth, (req, res) => {
        ConsoVolant.findByPk(req.params.id)
        .then(consovolant => {
            //gestion de l'erreur 404
            if(consovolant === null) {
                const message = `La consommation de volant demandé n'existe pas. Réessayez avec un autre id.`
                return res.status(404).json({message})
            }
            //ressource presente - status : 200
            const consovolantDeleted = consovolant
            
            return consovolant.destroy({where: { id: consovolant.id }})
            .then(_ => {
                const message = `La consommation de volant avec l'id: ${consovolantDeleted.id} a bien été supprimé.`
                res.json({message, data: consovolantDeleted })
            })
        })
        .catch(err => {
            const message = `La consommation de volant n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}