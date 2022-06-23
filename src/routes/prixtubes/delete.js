const { PrixTube } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
    app.delete('/api/prixtubes/:id', auth, (req, res) => {
        PrixTube.findByPk(req.params.id)
        .then(prixtube => {
            //gestion de l'erreur 404
            if(prixtube === null) {
                const message = `Le prix du tube n'existe pas. Réessayez avec un autre id.`
                return res.status(404).json({message})
            }
            //ressource presente - status : 200
            const prixtubeDeleted = prixtube
            
            return PrixTube.destroy({where: { id: prixtube.id }})
            .then(_ => {
                const message = `Le prix du tube avec l'id: ${prixtubeDeleted.id} a bien été supprimé.`
                res.json({message, data: prixtubeDeleted })
            })
        })
        .catch(err => {
            const message = `Le prix du tube n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}