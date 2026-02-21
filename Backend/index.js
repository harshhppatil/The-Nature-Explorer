const express = require('express');
const app = express()
app.use(express.json())

app.listen(3000, async () => {
    console.log("Server Started");
    
})

app.get("/",async (req,res) => {
    res.json({
        "Msg":"Welcome"
    })
})

app.get("/travel",async (req,res) => {
    res.json({
        "Places":[
            {"Country":"Japan","Place":"Osaka"},{"Country":"UK","Place":"London"}
        ]
    })
})

app.get("/travel/:id",async (req,res) => {
    const {id} = req.params
    console.log(id);
    
    res.json({
        "Msg":"Welcome"
    })
})

app.post("/travel",async (req,res) => {
    const {countries,places} = req.body
    console.log(countries,places)
    res.json({
        "Msg":"Success"        
    })
})