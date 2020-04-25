//framework for nodejs as middleware
const express = require('express')

//body-parser -> Parse incoming request bodies in a middleware before your handlers
//available under the req.body property.
const bodyParser = require('body-parser')

//mongoose -> It manages relationships between data, provides schema validation, 
//and is used to translate between objects in code and the representation of those objects in MongoDB
const mongoose = require('mongoose')

const app = express()

//port number for backend
const port = 3000
const {mongoUrl} = require('./key')

//requires all files of routes,schema and middleware which we will use
//Note: please first require all nessesary files after use it :)
require('./models/User');
const requireToken = require('./middleware/requireToken')
const authRoutes = require('./routes/authRoutes')


app.use(bodyParser.json())
app.use(authRoutes)

//create connection
mongoose.connect(mongoUrl,{ useNewUrlParser:true, useUnifiedTopology:true })

mongoose.connection.on('connected',()=>{
    console.log('connected to mongodb')
})
mongoose.connection.on('error',(err)=>{
    console.log('not connected',err)
})

//login using token response
app.get('/',requireToken,(req,res)=>{
    res.send("Your email is "+req.user.email)
})

app.post('/',(req, res)=>{
    console.log(req.body) 
    res.send('hello')
})

app.listen(port,()=>{
  console.log('server running '+ port);
})
