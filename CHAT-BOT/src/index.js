import express from "express";
import path from "path";
const app = express();
const directory = path.join(__dirname,".././");
app.use(express.static(directory));

app.get('/',(req,res)=>{
    res.sendFile(directory+"/chatBot.html");
})

app.listen(8080,()=>{
    console.log("On port 8080")
})
