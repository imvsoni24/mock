const express = require("express")
const { connection } = require("./db")
const {PostModel} = require("./post.model.js")
require("dotenv").config();
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

app.post("/add",async(req,res)=>{
    try{
        let postData = new PostModel(req.body)
        console.log(postData)
        await postData.save()
        res.send("Post has been added")
    }
    catch(err){
        res.send(err)
    }
})
app.get("/",async(req,res)=>{
    const destination = req.query.destination
    const high = req.query.budget
    const low = req.query.budget
    let query = {}
    if(destination){
        query.destination = destination
    }
    let sortDirection = 1
    if (high=="high") {
      sortDirection = -1
    }
    if(low=="low"){
        sortDirection = 1
    }

    try{
        let postData = await PostModel.find(query).sort({budget:sortDirection});
        res.send(postData)
    }
    catch(err){
        res.send(err)
    }
})

app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("server and data is running")
    }
    catch(err){
        console.log(err)
    }
})


