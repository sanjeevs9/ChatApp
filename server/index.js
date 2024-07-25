const express =require("express");
const cors=require("cors");

const app=express();

app.use(cors());
app.use(express.json());
const PORT=3000;

app.listen(PORT,()=>{
    console.log("backend connected on PORT :" +PORT);
})

app.get("",(req,res)=>{
    res.json({
        message:"hello from backend"
    })
})