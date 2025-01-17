const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const connectDB = require('./database')
const videoRoute = require('./routes/videoRoutes')
const port = 5000


connectDB()

app.use(cors({
    origin: "",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'public')))

app.use('/api', videoRoute)

app.listen(port, () =>{
    console.log(`Port running on ${port}`);
})
