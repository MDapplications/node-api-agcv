const { Commande } = require('../../db/sequelize')
const { ValidationError } = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.put('/api/commandes/:id', auth, (req, res) => {
        const id = req.params.id
        Commande.update(req.body, {where: {id}})
        .then(_ => {
            return Commande.findByPk(id) // retourne la promesse au bloque catch suivant en cas d'erreur 500
            .then(commande => {
                //gestion de l'erreur 404
                if(commande === null) {
                    const message = `La commande demandé n'existe pas. Réessayez avec un autre identifiant.`
                    return res.status(404).json({message})
                }
                //ressource presente - status : 200
                const message = `La commande id:${commande.id} a bien été modifié.`
                res.json({message, data: commande })
            })
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                return res.status(400).json({message: err.message, data: err})
            }
            const message = `La commande n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}