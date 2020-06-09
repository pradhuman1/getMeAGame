var searchForGame=false;
var smallCard = false;
var Data;
var gameName=["Grand Theft Auto V,Portal 2"];
var inputtxt = document.querySelector('.userInput')


document.querySelector('.options').addEventListener('click',(e)=>{
    var msg=document.getElementById(e.target.id).textContent;
    DisplayMessage(msg,"user");
    if(e.target.id==="giveInfo")
    {
        writingIndicator(true);
        setTimeout(()=>{
            writingIndicator(false);
        },1400);
        setTimeout(function(){
            DisplayMessage("For which game do you want to get information")
            searchForGame=true;
        },1500);
    }
    
})

function writingIndicator(add){
    if(add){
        var html='<div class="botChat"><div class="botMsg waiting"><div class="ticontainer"><div class="tiblock"><div class="tidot"></div><div class="tidot"></div><div class="tidot"></div></div></div></div></div>'
        document.querySelector('.chat-area').insertAdjacentHTML('beforeend',html);
    }else{
        var list=document.querySelector('.chat-area');
        var last=list.childNodes.length;
        last--;
        list.removeChild(list.childNodes[last]);
    }
}

document.querySelector('body').addEventListener('keypress',(e)=>{
    if(e.keyCode===13){
        var newUserMsg = document.querySelector('.userInput').value;
        DisplayMessage(newUserMsg,"user");

        
        if(searchForGame){
            writingIndicator(true);
            var newGame = new game(newUserMsg);
            var options={
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(newGame)
            }
            fetch('http://localhost:8000/gameName',options)
            .then((res)=>{
                res.json().then((data)=>{
                    Data=data;
                    displaySmallCard(data);
                })
            })
        }
        searchForGame=false;
    }
})

function displaySmallCard(data){
    writingIndicator(false);
    smallCard=true;
    var html = '<div class=botChat><div class="botMsg result"></div><div class="tellTo-getInfo" style="font-family:Ubuntu, sans-serif">Click on card to get detailed information</div> </div>';
    document.querySelector('.chat-area').insertAdjacentHTML('beforeend',html);
    html = '<div class=card id=smallCard><img src=%imgUrl% class=smallImg id="smallCard">%gameName%</div>';
    html = html.replace("%imgUrl%",data.background_image);
    html = html.replace("game-slug",data.slug);
    html = html.replace("game-slug",data.slug);    
    html = html.replace("%gameName%",data.name);
    var el = document.querySelectorAll(".result");
    var lastEl = el.length-1;
    el[lastEl].insertAdjacentHTML('beforeend',html);

}

var game=function(name){
    this.name=name;
}


document.querySelector('.chat-area').addEventListener('click',(e)=>{
    if(e.target.id == "smallCard"){
        displayFullCard(e.target.id);
    }
})

function DisplayMessage(msg,provider){
    if(msg){
        if(provider==="user")
        var html="<div class=userChat><div class=userMsg>%msg%</div></div>";
        else
        var html="<div class=botChat><div class=botMsg>%msg%</div></div>";
        html=html.replace('%msg%',msg);
        document.querySelector('.chat-area').insertAdjacentHTML('beforeend',html);
        clearInputArea();
        //put Scroll to bottom
        var objDiv = document.querySelector(".chat-area");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
}


function clearInputArea(){
    document.querySelector('.userInput').value = "";
}

function displayFullCard(game){
    if(game){
    globalData=Data;        
    document.querySelector('.popup').style.display="flex";
    }
}