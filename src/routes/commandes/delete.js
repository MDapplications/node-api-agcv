const { Commande } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
    app.delete('/api/commandes/:id', auth, (req, res) => {
        Commande.findByPk(req.params.id)
        .then(commande => {
            //gestion de l'erreur 404
            if(commande === null) {
                const message = `La commande demandé n'existe pas. Réessayez avec un autre id.`
                return res.status(404).json({message})
            }
            //ressource presente - status : 200
            const commandeDeleted = commande
            
            return Commande.destroy({where: { id: commande.id }})
            .then(_ => {
                const message = `La commande avec l'id: ${commandeDeleted.id} a bien été supprimé.`
                res.json({message, data: commandeDeleted })
            })
        })
        .catch(err => {
            const message = `La commande n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}