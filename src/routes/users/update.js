const { User } = require('../../db/sequelize')
const { ValidationError } = require('sequelize')
const auth = require('../../auth/auth')
const bcrypt = require('bcrypt')


module.exports = (app) => {
    app.put('/api/users/:id', auth, (req, res) => {

        const id = req.params.id
        const password = req.body.password //recupération du password pour hashage

        bcrypt.hash(password, 10)
        .then(hash => {
            req.body.password = hash //hashage du mot de passe avant update
            
            User.update(req.body, {where: {id}})
            .then(_ => {
                return User.findByPk(id) // retourne la promesse au bloque catch suivant en cas d'erreur 500
                .then(user => {
                    //gestion de l'erreur 404
                    if(user === null) {
                        const message = `L'utilisateur demandé n'existe pas. Réessayez avec un autre identifiant.`
                        return res.status(404).json({message})
                    }
                    //ressource presente - status : 200
                    const message = `L'utilisateur id:${user.id} a bien été modifié.`
                    res.json({message, data: user })
                })
            })
            .catch(err => {
                if (err instanceof ValidationError) {
                    return res.status(400).json({message: err.message, data: err})
                }
                const message = `L'utilisateur n'a pas pu être modifié. Réessayez dans quelques instants.`
                res.status(500).json({message, data: err})
            })

        })
    })
}