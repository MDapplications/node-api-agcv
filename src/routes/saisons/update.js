const { Saison } = require('../../db/sequelize')
const { ValidationError } = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.put('/api/saisons/:id', auth, (req, res) => {
        const id = req.params.id
        Saison.update(req.body, {where: {id}})
        .then(_ => {
            return Saison.findByPk(id) // retourne la promesse au bloque catch suivant en cas d'erreur 500
            .then(saison => {
                //gestion de l'erreur 404
                if(saison === null) {
                    const message = `La saison demandée n'existe pas. Réessayez avec un autre identifiant.`
                    return res.status(404).json({message})
                }
                //ressource presente - status : 200
                const message = `La saison id:${saison.id} a bien été modifié.`
                res.json({message, data: saison })
            })
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                return res.status(400).json({message: err.message, data: err})
            }
            const message = `La saison n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}