const { Membre } = require('../../db/sequelize')
const { ValidationError } = require('sequelize')
//const auth = require('../../auth/auth')

module.exports = (app) => {
    app.put('/api/membres/:id', (req, res) => {
        const id = req.params.id
        Membre.update(req.body, {where: {id}})
        .then(_ => {
            return Membre.findByPk(id) // retourne la promesse au bloque catch suivant en cas d'erreur 500
            .then(membre => {
                //gestion de l'erreur 404
                if(membre === null) {
                    const message = `Le membre demandé n'existe pas. Réessayez avec un autre identifiant.`
                    return res.status(404).json({message})
                }
                //ressource presente - status : 200
                const message = `Le membre id:${membre.id} a bien été modifié.`
                res.json({message, data: membre })
            })
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                return res.status(400).json({message: err.message, data: err})
            }
            const message = `Le membre n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}