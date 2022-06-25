const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 
const {NODE_APP_PRIVATE_KEY} = process.env


module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        User.findOne({ where: { username: req.body.username } }).then(user => {
            if(!user) {
                const message = `l'utilisateur demandé n'existe pas.`
                return res.status(404).json({message})
            }

            bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                if(!isPasswordValid) {
                    const message = `Le mot de passe est incorrect.`
                    return res.status(401).json({ message })
                }

                //JWT
                const token = jwt.sign(
                    {userId: user.id},
                    `${NODE_APP_PRIVATE_KEY}`,
                    { expiresIn: '24h'}
                )

                const message = `L'utilisateur a été connecté avec succès`
                return res.json({ message, data: user, token })
            })
        })
        .catch(err => {
            const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`
            return res.status(500).json({ message, data: err })
        })
    })
}