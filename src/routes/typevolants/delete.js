const { TypeVolant } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
    app.delete('/api/typevolants/:id', auth, (req, res) => {
        TypeVolant.findByPk(req.params.id)
        .then(typevolant => {
            //gestion de l'erreur 404
            if(typevolant === null) {
                const message = `Le type de volant demandé n'existe pas. Réessayez avec un autre id.`
                return res.status(404).json({message})
            }
            //ressource presente - status : 200
            const typevolantDeleted = typevolant
            
            return TypeVolant.destroy({where: { id: typevolant.id }})
            .then(_ => {
                const message = `Le type de volant avec l'id: ${typevolantDeleted.id} a bien été supprimé.`
                res.json({message, data: typevolantDeleted })
            })
        })
        .catch(err => {
            const message = `Le type de volant n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}