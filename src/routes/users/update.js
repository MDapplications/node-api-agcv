const { User } = require('../../db/sequelize')
const { ValidationError } = require('sequelize')
const auth = require('../../auth/auth')
const bcrypt = require('bcrypt')


module.exports = (app) => {
    app.put('/api/users/:id', auth, (req, res) => {

        const id = req.params.id

        if (req.body.password) {

            User.findByPk(id).then(user => {
                if(!user) {
                    const message = `l'utilisateur demandé n'existe pas.`
                    return res.status(404).json({message})
                }
    
                bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                    if(!isPasswordValid) {
                        const message = `Le mot de passe actuelle est incorrect.`
                        return res.status(401).json({ message })
                    }
    
                    const password = req.body.newPassword //recupération du nouveau password pour hashage

                    bcrypt.hash(password, 10)
                    .then(hash => { 

                        User.update({password: hash}, {where: {id}})
                        .then(_ => {
                            return User.findByPk(id) // retourne la promesse au bloque catch suivant en cas d'erreur 500
                            .then(user => {
                                //gestion de l'erreur 404
                                if(user === null) {
                                    const message = `L'utilisateur demandé n'existe pas. Réessayez avec un autre identifiant.`
                                    return res.status(404).json({message})
                                }
                                //ressource presente - status : 200
                                const message = `Le mot de passe de l''utilisateur id:${user.id} a bien été modifié.`
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
            })

        } else {

            User.update(req.body, {where: {id}})
            .then(_ => {
                return User.findByPk(id)
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

        }
        
    })
}