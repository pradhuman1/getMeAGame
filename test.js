const express = require('express');
const fetch = require('node-fetch');
const app = express();
const fs = require('fs');
const path = require('path');
const botDirectory = path.join(__dirname,'./CHAT-BOT');
const cors = require('cors');
const mongoose=require('mongoose');

var game;
app.use(express.static(botDirectory));

app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});
// app.get('/',async (req,res)=>{
    // var response=await fetch("https://api.rawg.io/api/games?page=1",{
    //     method:'GET'
        // headers:{
        //     "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
        //     "x-rapidapi-key": "114a03074emshed4812464ea0bfbp17ad94jsn90871bc6120d",
        //     "useQueryString": true
        // }
    // })
    // var data = await response.json();
    // while(data.next){

    //     response=await fetch(data.next,{
    //         method:'GET'
    //         // headers:{
    //         //     "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
    //         //     "x-rapidapi-key": "114a03074emshed4812464ea0bfbp17ad94jsn90871bc6120d",
    //         //     "useQueryString": true
    //         // }
    //     })
    //     data = await response.json();
    //     console.log(data.next);
    // }

//     res.send(data);
//     fs.writeFile('data.json', JSON.stringify(data), function (err) {
//         if (err) return console.log(err);
//         console.log('Hello World > helloworld.txt');
//       });
// })

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/CHAT-BOT'+'/chatBot.html');
})

app.post('/gameName',async (req,res)=>{
    var gameData;
    game = await req.body.name;
    game=game.replace(/ /g,"-");
    game=game.toLowerCase();
    console.log(game);
    var response=await fetch("https://api.rawg.io/api/games?page=1");
    data = await response.json();
    // console.log("Data:" ,data);
    var dataResults = data.results;
    dataResults.forEach((curr)=>{
        if(curr.slug===game){
            gameData=curr;
        }
    })
    // console.log(gameData);
    res.send(gameData);
})

app.listen(8000,async ()=>{

    // function connectDb(){
    //     return mongoose.connect('mongodb+srv://dbUser:dbUser@games-data-j0r9m.mongodb.net/test')
    // }

    // try{
    //     await connectDb();
    // }catch(err){
    //     console.log(err);
    // }
    // const gameSchema=new mongoose.Schema({
    //     name:{
    //         type:String
    //     }
    // })
    // const gameData=mongoose.model('data',gameSchema);
    // const contact = await gameData.create({ name: "pradhuman" });
    // db.gamesdb.insertOne(
    //     { 
    //         name: "pradhuman" 
    //     }
    // );
    // console.log(contact);

    console.log('ON PORT 8000');
})
