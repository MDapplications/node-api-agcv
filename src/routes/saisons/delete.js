const { Saison } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
    app.delete('/api/saisons/:id', auth, (req, res) => {
        Saison.findByPk(req.params.id)
        .then(saison => {
            //gestion de l'erreur 404
            if(saison === null) {
                const message = `La saison demandée n'existe pas. Réessayez avec un autre id.`
                return res.status(404).json({message})
            }
            //ressource presente - status : 200
            const saisonDeleted = saison
            
            return Saison.destroy({where: { id: saison.id }})
            .then(_ => {
                const message = `La saison avec l'id: ${saisonDeleted.id} a bien été supprimé.`
                res.json({message, data: saisonDeleted })
            })
        })
        .catch(err => {
            const message = `La saison n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}