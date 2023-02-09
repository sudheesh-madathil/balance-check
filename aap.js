const express=require('express')
const cors=require('cors')
const body_parse=require('body-parser')
const fs=require("node:fs/promises")
const data=require('./data.json')
const { json } = require('body-parser')
const { parse } = require('node:path')

const app =express()
app.use(cors())
app.use(body_parse.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.send("hello")
})

app.post('/Deposite',(req,res)=>{
    fs.writeFile(__dirname + '/data.json',JSON.stringify({balance:req.body.deposit})).then(result=>{
        console.log(result)
    res.end()
    })
    
})

app.post('/Withdraw',(req,res)=>{
    let widraw=Number(req.body.Withdraw)
    let Parsedata=data.balance
    let balance=Number(Parsedata)-widraw

    console.log(balance);
    fs.writeFile(__dirname + "/data.json", JSON.stringify({balance:balance})).then(
        (result) => {
            console.log(result);
            res.redirect("back")
        }
    )
})

app.get('/balance', (req, res) => {

    res.json(data.balance)

})


app.listen(5500,()=>{
    console.log("started");
})