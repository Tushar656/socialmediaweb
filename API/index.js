const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/SocialMedia')
.then(()=>{
    console.log('Connection successful')
}).catch((e)=>{
    console.log("No connection")
})

const morgan = require('morgan')
const helmet = require('helmet')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')
const conversationRoute = require('./routes/Conversations')
const messageRoute = require('./routes/Message')

const port = process.env.PORT || 8000

const multer = require('multer')
const path = require("path")


// MIDDLEWARES
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postsRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);


// multer Documentation
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "public/images")
    },
    filename: (req, file, cb)=>{
        cb(null, req.body.name)
    }
})

app.use('/images', express.static(path.join(__dirname, "public/images")))

const upload = multer({storage});
app.post('/api/upload',upload.single("file"), (req, res)=>{
    try{
        return res.status(200).send("File upload successfully")
    }catch(err){
        console.log("Uploading error");
    }
})



app.get('/', (req, res)=>{
    res.send('Welcomse to home page')
})

app.listen(port, ()=>{
    console.log(`Server is run at port ${port}`)
})

// C:\Users\tushar\Documents\Coding\Web Developmenr\Webs\Project6\API\public\images
// C:\Users\tushar\Documents\Coding\Web Developmenr\Webs\Project6\public\images\pos6.jpg