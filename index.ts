import { setTimeout } from "timers";

const { spawn } = require("child_process")
const http=require('http');
const express = require("express")

let BATCH_PATH = "job.bat"

const app = express()

const server = http.createServer(app);

app.get("/",(req:any,res:any)=>res.sendFile(__dirname+"/index.html"))

app.post("/dobatchjob",(req:any,res:any)=>{
    let ok=true

    try{
        console.log("spawn "+BATCH_PATH)
        let proc = spawn(BATCH_PATH)            

        console.log("setting handlers")
        proc.on("error", (err:any) => {
            console.log(err)
            ok=false
        })

        proc.stdout.on('data', (data:any) => console.log(data.toString()) )
        proc.stderr.on('data', (data:any) => console.log(data.toString()) )
    }catch(err){
        console.log(err)
        ok=false
    }

    setTimeout((e:Event)=>{
        res.send("Batch job "+(ok?"done":"failed"))
    },3000)

    server.close()
})

server.listen(9000, () => {
    console.log(`Node engine server started on port ${server.address().port}`);
})

