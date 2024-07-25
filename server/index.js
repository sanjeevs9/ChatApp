const express =require("express");
const cors=require("cors");
const {createServer} =require("http")
const app=express();
const { Server } = require("socket.io");
const { log } = require("console");
const { SocketAddress } = require("net");


app.use(cors());
app.use(express.json());
const PORT=5000;

const httpServer=createServer(app);

const io=new Server(httpServer,{
    cors:{
        origin:"http://localhost:5173"
    }
});

io.on("connection",(socket)=>{
    console.log("connected to web socket");
    console.log(socket.id);

    socket.emit("welcome","welcome to the server")
    socket.broadcast.emit("welcome",`user has joind the server ${socket.id}`)

    socket.on("message",({message,id})=>{
            // socket.broadcast.emit("sent",data)
            console.log(message);
            console.log(id);
            io.to(id).emit("sent",message);
    })
    

    socket.on("join",(data)=>{
        socket.join(data);
    })

    socket.on("disconnect",()=>{
        console.log(`disconnect as ${socket.id}`)
    })
})



httpServer.listen(PORT,()=>{
    console.log("backend connected on PORT :" +PORT);
})

app.get("",(req,res)=>{
    res.json({
        message:"hello from backend"
    })
})