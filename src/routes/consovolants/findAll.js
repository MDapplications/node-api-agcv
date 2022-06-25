const { ConsoVolant } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/consovolants', auth, (req, res) => {

        //findAll standard : 
        ConsoVolant.findAll()
        .then(consovolants => {
            const message = 'La liste des consommations de volant a bien été récupérée.'
            res.json({ message, data: consovolants })
        })
        .catch(err => {
            const message = `La liste des consommations de volant n'a pas pu être récupérée. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}