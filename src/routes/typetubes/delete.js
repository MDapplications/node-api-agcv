const { TypeTube } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
    app.delete('/api/typetubes/:id', auth, (req, res) => {
        TypeTube.findByPk(req.params.id)
        .then(typetube => {
            //gestion de l'erreur 404
            if(typetube === null) {
                const message = `Le type de tube demandé n'existe pas. Réessayez avec un autre id.`
                return res.status(404).json({message})
            }
            //ressource presente - status : 200
            const typetubeDeleted = typetube
            
            return TypeTube.destroy({where: { id: typetube.id }})
            .then(_ => {
                const message = `Le type de tube avec l'id: ${typetubeDeleted.id} a bien été supprimé.`
                res.json({message, data: typetubeDeleted })
            })
        })
        .catch(err => {
            const message = `Le type de tube n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}