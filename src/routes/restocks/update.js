const { Restock } = require('../../db/sequelize')
const { ValidationError } = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.put('/api/restocks/:id', auth, (req, res) => {
        const id = req.params.id
        Restock.update(req.body, {where: {id}})
        .then(_ => {
            return Restock.findByPk(id) // retourne la promesse au bloque catch suivant en cas d'erreur 500
            .then(restock => {
                //gestion de l'erreur 404
                if(restock === null) {
                    const message = `Le restock demandé n'existe pas. Réessayez avec un autre identifiant.`
                    return res.status(404).json({message})
                }
                //ressource presente - status : 200
                const message = `Le restock id:${restock.id} a bien été modifié.`
                res.json({message, data: restock })
            })
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                return res.status(400).json({message: err.message, data: err})
            }
            const message = `Le restock n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}