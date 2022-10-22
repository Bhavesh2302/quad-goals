

const express = require("express")
require("dotenv").config()
const cors = require('cors')
const app=express()
const { connection } = require("./configs/db")

const PORT = process.env.PORT || 7000


app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    
    res.send({"msg":"hello"})
})

app.listen(PORT,async ()=>{

try {
    await connection
    console.log(`running on http://localhost:${PORT}`)
}
 catch (error) {
    console.log(error)
}
})




