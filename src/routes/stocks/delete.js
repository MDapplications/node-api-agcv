const { Stock } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
    app.delete('/api/stocks/:id', auth, (req, res) => {
        Stock.findByPk(req.params.id)
        .then(stock => {
            //gestion de l'erreur 404
            if(stock === null) {
                const message = `Le stock demandé n'existe pas. Réessayez avec un autre id.`
                return res.status(404).json({message})
            }
            //ressource presente - status : 200
            const stockDeleted = stock
            
            return Stock.destroy({where: { id: stock.id }})
            .then(_ => {
                const message = `Le stock avec l'id: ${stockDeleted.id} a bien été supprimé.`
                res.json({message, data: stockDeleted })
            })
        })
        .catch(err => {
            const message = `Le stock n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}