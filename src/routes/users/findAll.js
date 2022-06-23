const { User } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/users', auth, (req, res) => {

        if (req.query.actif) {

            //?actif=*
            const query = req.query.actif
            
            // actif doit être egale à 'true' ou 'false'
            if (query !== 'true' && query !== 'false') {
                const message = `Le terme de recherche doit être 'true' ou 'false'.`
                return res.status(400).json({message})
            } 

            const actif = (query === 'true')

            //recherche standard
            return User.findAndCountAll({where: {actif}})
            .then(({count, rows}) => {
                const message = `Il y a ${count} utilisateurs qui correspondent à actif = ${actif}.`
                res.json({message, data: rows})
            })
            .catch(err => {
                const message = `La liste des utilisateurs n'a pas pu être récupérée. Réessayez dans quelques instants.`
                res.status(500).json({message, data: err})
            })

        }

        
        User.findAll()
        .then(users => {
            const message = 'La liste des utilisateurs a bien été récupérée.'
            res.json({ message, data: users })
        })
        .catch(err => {
            const message = `La liste des utilisateurs n'a pas pu être récupérée. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}