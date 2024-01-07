const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8001
require('./db/index')
const routes = require('./routes/index')

// validate express body
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api',routes)  

app.all('*',(_req,res)=>{
    return res.status(404).json({ message: 'Page Not Found!!!'})
})

app.listen(port,()=> {
    console.log(`Server is running on ${port}`);
})