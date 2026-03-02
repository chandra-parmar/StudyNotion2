const express = require('express')
const dbConnect= require('./config/database')
const app = express()
const port=5002
const cookieParser = require('cookie-parser')


// Database connectivity
dbConnect()

//middlewares
app.use(express.json())
app.use(cookieParser())


//Routes mounting
const authRoutes = require('./routes/authRoutes')
app.use('/api/',authRoutes)


app.listen(port,()=>{
    console.log("server is listing at port",port)

})