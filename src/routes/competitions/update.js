const { Competition } = require('../../db/sequelize')
const { ValidationError } = require('sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
    app.put('/api/competitions/:id', auth, (req, res) => {
        const id = req.params.id
        Competition.update(req.body, {where: {id}})
        .then(_ => {
            return Competition.findByPk(id) // retourne la promesse au bloque catch suivant en cas d'erreur 500
            .then(compet => {
                //gestion de l'erreur 404
                if(compet === null) {
                    const message = `La competition demandé n'existe pas. Réessayez avec un autre identifiant.`
                    return res.status(404).json({message})
                }
                //ressource presente - status : 200
                const message = `La competition id:${compet.id} a bien été modifié.`
                res.json({message, data: compet })
            })
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                return res.status(400).json({message: err.message, data: err})
            }
            const message = `La competition n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}