const { Membre } = require('../../db/sequelize')
//const auth = require('../auth/auth')
  
module.exports = (app) => {
    app.delete('/api/membres/:id', (req, res) => {
        Membre.findByPk(req.params.id)
        .then(membre => {
            //gestion de l'erreur 404
            if(membre === null) {
                const message = `Le membre demandé n'existe pas. Réessayez avec un autre id.`
                return res.status(404).json({message})
            }
            //ressource presente - status : 200
            const membreDeleted = membre
            
            return Membre.destroy({where: { id: membre.id }})
            .then(_ => {
                const message = `Le membre avec l'id: ${membreDeleted.id} a bien été supprimé.`
                res.json({message, data: membreDeleted })
            })
        })
        .catch(err => {
            const message = `Le membre n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}