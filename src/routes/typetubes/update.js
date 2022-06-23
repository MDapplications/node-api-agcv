const { TypeTube } = require('../../db/sequelize')
const { ValidationError } = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.put('/api/typetubes/:id', auth, (req, res) => {
        const id = req.params.id
        TypeTube.update(req.body, {where: {id}})
        .then(_ => {
            return TypeTube.findByPk(id) // retourne la promesse au bloque catch suivant en cas d'erreur 500
            .then(typetube => {
                //gestion de l'erreur 404
                if(typetube === null) {
                    const message = `Le type de tube demandé n'existe pas. Réessayez avec un autre identifiant.`
                    return res.status(404).json({message})
                }
                //ressource presente - status : 200
                const message = `Le type de tube id:${typetube.id} a bien été modifié.`
                res.json({message, data: typetube })
            })
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                return res.status(400).json({message: err.message, data: err})
            }
            const message = `Le type de tube n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}