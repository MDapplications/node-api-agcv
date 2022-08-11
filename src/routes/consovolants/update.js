const { ConsoVolant } = require('../../db/sequelize')
const { ValidationError } = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.put('/api/consovolants/:id', auth, (req, res) => {
        const id = req.params.id
        ConsoVolant.update(req.body, {where: {id}})
        .then(_ => {
            return ConsoVolant.findByPk(id) // retourne la promesse au bloque catch suivant en cas d'erreur 500
            .then(consovolant => {
                //gestion de l'erreur 404
                if(consovolant === null) {
                    const message = `La consommation de volant demandé n'existe pas. Réessayez avec un autre identifiant.`
                    return res.status(404).json({message})
                }
                //ressource presente - status : 200
                const message = `La consommation de volant  id:${consovolant.id} a bien été modifié.`
                res.json({message, data: consovolant })
            })
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                return res.status(400).json({message: err.message, data: err})
            }
            const message = `La consommation de volant n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}