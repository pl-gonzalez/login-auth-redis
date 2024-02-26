require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

const users = []
const posts = [
    {
        name: "Leon",
        title: "Post 1"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    }
]


// apenas para teste, em produção nao é ideal
let refreshTokens = []


app.use(express.json())

app.post('/token', (req,res) => {
    const refreshToken = req.body.token
    if( refreshToken == null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return sendStatus(403)

        // const accessToken = generateAccessToken(user) -> Dessa forma, todas a informações serão criptografadas novamente, inclusive o token expridado(?)
        /**
         * {
            "name": "Vitoria",
            "iat": 1708907548,
            "exp": 1708907578
            }
         */

        const accessToken = generateAccessToken({name: user.name})
        res.json(accessToken)
    })
})

app.delete('/logout', (req,res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10) // 10 is a default value of genSalt()
        console.log(hashedPassword)
        const user = {name: req.body.name, password: hashedPassword}
        users.push(user)
        res.send(user)
        res.status(201).send()
    } catch (error) {
        res.status(500).send()
    }
})

app.post('/users/login', async (req,res) =>{
    // Valida Login
    const user = users.find(user => user.name === req.body.name)
    if(user == null){ 
        return res.status(400).send('cannot find user')
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            // console.log("success")

            // Cria JWT
            // Objeto user é passado p jwt
            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET) // Sem data de expiração, pode ser trocado na rota de logout. Pesquisar sobre metodos usados
            refreshTokens.push(refreshToken)
            console.log({accessToken: accessToken, refreshToken: refreshToken})
            res.send({accessToken: accessToken, refreshToken: refreshToken})
        } else {
            res.send('Not allowed')
        }
    } catch (error) {
        res.status(500).send()
    }
})

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 30})
}

// app.get('/', (req, res) => {
//     res.json(users)
// })

// app.get('/posts', authToken, (req, res) => {
//     res.json(posts.filter(post => post.name === req.user.name))
// })

// Verifica o JWT do usuario realizando o request
// function authToken(req, res, next){
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]

//     if(token == null) return res.sendStatus(401)

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if(err) return res.sendStatus(403)
//         req.user = user
//         next()
//     })
//     //token vem do header chamado Bearer TOKEN
// }

app.listen(4000)