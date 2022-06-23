const { TypeTube } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/typetubes', auth, (req, res) => {

        //findAll standard : 
        TypeTube.findAll()
        .then(typetubes => {
            const message = 'La liste des types de tube a bien été récupérée.'
            res.json({ message, data: typetubes })
        })
        .catch(err => {
            const message = `La liste des types de tube n'a pas pu être récupérée. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}