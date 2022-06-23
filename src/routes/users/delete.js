const { User } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
    app.delete('/api/users/:id', auth, (req, res) => {
        User.findByPk(req.params.id)
        .then(user => {
            //gestion de l'erreur 404
            if(user === null) {
                const message = `L'utilisateur demandé n'existe pas. Réessayez avec un autre id.`
                return res.status(404).json({message})
            }
            //ressource presente - status : 200
            const userDeleted = user
            
            return User.destroy({where: { id: user.id }})
            .then(_ => {
                const message = `L'utilisateur avec l'id: ${userDeleted.id} a bien été supprimé.`
                res.json({message, data: userDeleted })
            })
        })
        .catch(err => {
            const message = `L'utilisateur n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}