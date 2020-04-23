const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const {mongoUrl} = require('./key')

require('./models/User');

const authRoutes = require('./routes/authRoutes')
app.use(bodyParser.json())
app.use(authRoutes)

mongoose.connect(mongoUrl,{ useNewUrlParser:true, useUnifiedTopology:true })

mongoose.connection.on('connected',()=>{
    console.log('connected to mongodb')
})
mongoose.connection.on('error',(err)=>{
    console.log('not connected',err)
})

app.post('/',(req, res)=>{
    console.log(req.body) 
    res.send('hello')
})

app.listen(port,()=>{
  console.log('server running '+ port);
})
