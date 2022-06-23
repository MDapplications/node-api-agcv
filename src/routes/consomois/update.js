const { ConsoMois } = require('../../db/sequelize')
const { ValidationError } = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.put('/api/consomois/:id', auth, (req, res) => {
        const id = req.params.id
        ConsoMois.update(req.body, {where: {id}})
        .then(_ => {
            return ConsoMois.findByPk(id) // retourne la promesse au bloque catch suivant en cas d'erreur 500
            .then(mois => {
                //gestion de l'erreur 404
                if(mois === null) {
                    const message = `Le ConsoMois demandé n'existe pas. Réessayez avec un autre identifiant.`
                    return res.status(404).json({message})
                }
                //ressource presente - status : 200
                const message = `Le ConsoMois id:${mois.id} a bien été modifié.`
                res.json({message, data: mois })
            })
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                return res.status(400).json({message: err.message, data: err})
            }
            const message = `Le ConsoMois n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}