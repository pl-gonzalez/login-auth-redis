const express = require('express')
const bcrypt = require('bcrypt')

const app = express()

const users = []
const posts = [
    {
        username: "Leon",
        title: "Post 1"
    },
    {
        username: "Vitoria",
        title: "Post 2"
    }
]
app.use(express.json())

app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 15) // 10 is a default value of genSalt()
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
    const user = users.find(user => user.name === req.body.name)
    if(user == null){ 
        return res.status(400).send('cannot find user')
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('success')
            // Logica apos logar
        } else {
            res.send('Not allowed')
        }
    } catch (error) {
        res.status(500).send()
    }

    //
})

app.get('/', (req, res) => {
    res.send(users)
})

app.listen(5000)