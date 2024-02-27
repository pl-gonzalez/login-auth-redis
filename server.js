require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Redis = require('redis')

const redisClient = Redis.createClient();

const app = express();

(async () => {
    await redisClient.connect();
    console.log("Connected")
})();

// redisClient.on('connect', () => console.log('Redis Client Connected'));
// redisClient.on('error', (err) => console.log('Redis Client Connection Error', err));

const DEFAULT_EXPIRATION = 10600;
const users = []
const posts = [
    {
        name: "Leon",
        title: "Post 1"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    },
    {
        name: "Vitoria",
        title: "Post 2"
    }
]
app.use(express.json())

// app.post('/users', async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10) // 10 is a default value of genSalt()
//         console.log(hashedPassword)
//         const user = {name: req.body.name, password: hashedPassword}
//         users.push(user)
//         res.send(user)
//         res.status(201).send()
//     } catch (error) {
//         res.status(500).send()
//     }
// })

// app.post('/users/login', async (req,res) =>{
//     // Valida Login
//     const user = users.find(user => user.name === req.body.name)
//     if(user == null){ 
//         return res.status(400).send('cannot find user')
//     }
//     try {
//         if(await bcrypt.compare(req.body.password, user.password)){
//             console.log("success")

//             // Cria JWT
//             // Objeto user é passado p jwt
//             const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//             res.send({accessToken: accessToken})
//         } else {
//             res.send('Not allowed')
//         }
//     } catch (error) {
//         res.status(500).send()
//     }
// })

// app.get('/', (req, res) => {
//     res.json(users)
// })

app.get('/posts', authToken, async (req, res) => {
    const filterPosts = posts.filter(post => post.name === req.user.name);
    const cachedPosts = await redisClient.get('posts') || null;
    if(cachedPosts != null){
        console.log('retirei do cache com redis');
        return res.json(posts);
    } else {
        redisClient.set('posts', JSON.stringify(filterPosts));
        console.log('Nao tinha em cache, tive que pesquisar no "banco" hehe');
    
        res.json(filterPosts);
    }
    // redisClient.get('posts', async (error, posts) => {
    //     if(error) console.log(error);
    //     console.log(posts);
    //     if(posts != null){
    //         console.log('retirei do cache com redis');
    //         return res.json(JSON.parse(posts));
    //     } else {
    //         // nao imagino que irei ver diferença, pq os dados do posts não estao em banco de dados, porém sera possivel ver o caminho feito pelo redis
            
    //         redisClient.set('posts', JSON.stringify(filterPosts));
    //         console.log('Nao tinha em cache, tive que pesquisar no "banco" hehe');
            
    //         res.json(filterPosts);
    //     }
    // });
    
})

// Verifica o JWT do usuario realizando o request
function authToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
    //token vem do header chamado Bearer TOKEN
}

app.listen(5000)