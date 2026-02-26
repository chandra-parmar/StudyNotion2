const express = require('express')
const dbConnect= require('./config/database')
const app = express()

const port=5000


dbConnect()

app.listen(port,()=>{
    console.log("server is listing at port",port)

})