const { TypeVolant } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/typevolants', auth, (req, res) => {

        //findAll standard : 
        TypeVolant.findAll()
        .then(typevolants => {
            const message = 'La liste des types de volant a bien été récupérée.'
            res.json({ message, data: typevolants })
        })
        .catch(err => {
            const message = `La liste des types de volant n'a pas pu être récupérée. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}