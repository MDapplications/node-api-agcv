const { Stock } = require('../../db/sequelize')
const { ValidationError } = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.put('/api/stocks/:id', auth, (req, res) => {
        const id = req.params.id
        Stock.update(req.body, {where: {id}})
        .then(_ => {
            return Stock.findByPk(id) // retourne la promesse au bloque catch suivant en cas d'erreur 500
            .then(stock => {
                //gestion de l'erreur 404
                if(stock === null) {
                    const message = `Le stock demandé n'existe pas. Réessayez avec un autre identifiant.`
                    return res.status(404).json({message})
                }
                //ressource presente - status : 200
                const message = `Le stock id:${stock.id} a bien été modifié.`
                res.json({message, data: stock })
            })
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                return res.status(400).json({message: err.message, data: err})
            }
            const message = `Le stock n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}