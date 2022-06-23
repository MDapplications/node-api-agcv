const { Restock } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/restocks', auth, (req, res) => {

        //findAll standard : 
        Restock.findAll()
        .then(restocks => {
            const message = 'La liste des restocks a bien été récupérée.'
            res.json({ message, data: restocks })
        })
        .catch(err => {
            const message = `La liste des restocks n'a pas pu être récupérée. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}