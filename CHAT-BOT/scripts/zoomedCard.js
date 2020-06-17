var obj = {
    "exID":"exData"
}
var months = ["0","January","Febuary","March","April","May","June","July","August","September","October","November","December"];
var date=[];
document.querySelector('.chat-area').addEventListener('click',(e)=>{
    var gameID = e.target.id.split('-')[1];
    var flag = e.target.id.split('-')[0];
    
    if(flag === "smallCard"){
        if(obj[gameID]){
            globalData = obj[gameID];
        }else{
            if(globalData)
            obj[gameID] = globalData;
        }
        // console.log(obj);
        if(globalData){
            var info = function(data){
                this.name=globalData.name;
                this.image=globalData.background_image;
                this.platforms = globalData.platforms;
                this.clip=globalData.clip;
                this.rating=globalData.rating;
                this.top_rating=globalData.rating_top;
                this.rating_count=globalData.ratings_count;
                
                date = globalData.released;
                date = date.split('-');
                this.releasedDate = " " + months[parseInt(date[1])] + " " + date[2] + ", " + date[0];

                this.screenshots=globalData.short_screenshots;
                this.stores=globalData.stores;
            }            
            var game = new info(globalData);
            var videoImage=[];
            var currImg = 0;
            var store;            
            if(game.clip)
            videoImage.push(game.clip);

            game.screenshots.forEach((curr)=>{
                videoImage.push(curr.image);
            })

            removePreviousStuff();
            modifyCard(game);

            //Adding url to buy button

            document.querySelector('.stores').addEventListener('click',(e)=>{
                var url = e.target.id;
                if(url)
                document.querySelector('.buy').action=url;
            })

            //Removing popup

            document.querySelector('.popup').addEventListener('click',(e)=>{
                if(e.target.classList[0]==="popup"){
                    document.querySelector('.popup').style.display="none";
                }
            })

            //Displaying preview cards on screen

            document.querySelector('.previewCards').addEventListener('click',(e)=>{
                if(e.target.id==="image")
                displayOnScreen(e.target.src,e.target.id);
                else if(e.target.id==="video")
                displayOnScreen("",e.target.id);
            })

            //chnging preview Cards

            document.querySelector('.btn-right').addEventListener('click',changePreviewRight);
            document.querySelector('.btn-left').addEventListener('click',changePreviewLeft);            

            //For star reviews

            document.querySelector('.starReview').addEventListener('click', (e) => {
                var id = e.target.id;
                id = id.split('-');
                id = id[0];
        
                rateGame(id);
            });

            function rateGame(id){
        
                RemoveOldStars();
                ShowShars(id);
        
                function ShowShars(id) {
                    for (var i = 1; i <= id; i++) {
                        document.getElementById(i + '-star').classList.add("checked");
                    }
                }
        
                function RemoveOldStars() {
                    for (var i = 1; i <= 5; i++) {
                        document.getElementById(i + '-star').classList.remove("checked");
                    }
                }
            }

            //Selecting store

            document.querySelector('.stores').addEventListener('click',(e)=>{
                store = e.target.id;
                document.querySelectorAll(".store").forEach((curr)=>{
                    curr.classList.remove("selectedStore");
                })
                if(store)    
                document.getElementById(store).classList.add("selectedStore");
            })

            //On click to buy button go to store

            document.querySelector('.btn-danger').addEventListener('click',goToStore);
        
            function goToStore(){
                document.querySelector('.selectingStore').classList.remove("warn");
                
                if(store){
                    document.querySelector('.btn-danger').type="submit";
                }else{
                    document.querySelector('.selectingStore').classList.add("warn");
                }
            }
        

            //Modifying card

            function modifyCard(game){
                //Changing Cover photo

                var html='<img src="%imgUrl%" class="cover-img">';
                html = html.replace("%imgUrl%",game.image);
                document.querySelector('.image').insertAdjacentHTML('beforeend',html);

                //adding stores

                game.stores.forEach((curr)=>{
                    html = '<div class="store" id="%storeUrl%" >%storeName%</div>';
                    html = html.replace("%storeName%",curr.store.name);

                    //Changing url for indian stores

                    // curr.url_en = curr.url_en.replace("https://store.playstation.com/en-us","https://store.playstation.com/en-in");
                    // curr.url_en = curr.url_en.replace("https://marketplace.xbox.com/en-US","https://marketplace.xbox.com/en-in");
                    // curr.url_en = curr.url_en.replace("https://marketplace.xbox.com/en-us","https://marketplace.xbox.com/en-in");                    
                                        
                    html = html.replace("%storeUrl%",curr.url_en);
                    document.querySelector('.stores').insertAdjacentHTML('beforeend',html);
                })
                if(!(document.querySelector('.stores').childNodes.length)){
                    document.querySelector('.stores').textContent = "Sorry!! No Stores Available";
                }

                //adding platforms

                game.platforms.forEach((curr)=>{
                    curr = curr.platform.name;
                    html = '<div class="platform">%platformName%</div>';
                    html = html.replace("%platformName%",curr);
                    document.querySelector('.platforms').insertAdjacentHTML('beforeend',html);
                })
                
                //General info update

                document.querySelector('.game-title').textContent = game.name;
                document.querySelector('.releaseDate').textContent = "Released on " + game.releasedDate;
                document.querySelector('.rating').textContent = game.rating + " / " + game.top_rating;
                document.querySelector('.rating-count').textContent = game.rating_count + " Ratings";

                //adding screenshots and video
                if(game.clip)
                displayOnScreen(videoImage[0],"video");
                else{
                    displayOnScreen(videoImage[0],"image")
                }
                displayPreview(0);

            }

            function displayOnScreen(Src,type){
                document.querySelector('.screen').innerHTML="";    
                if(type==="image"){
                    var html = '<img src="%url%" width="640px" height="360px">'
                    html = html.replace("%url%",Src);
                    document.querySelector('.screen').insertAdjacentHTML('beforeend',html);
                }else if(type==="video"){
                    var htmlBigger = '<video width="640px" height="360px" controls><source src="%url%" type="video/mp4"></video>';                     
                    htmlBigger = htmlBigger.replace("%url%",videoImage[0]);
                    document.querySelector('.screen').insertAdjacentHTML('beforeend',htmlBigger);
                }
            }

            function changePreviewRight(){
                if(currImg+4<videoImage.length){
                    document.querySelector('.previewCards').innerHTML="";
                    displayPreview(currImg+1)                        
                }else{
                    displayPreview(videoImage.length-4);
                }            
            }
            function changePreviewLeft(){
                if(currImg-7>=0){
                    document.querySelector('.previewCards').innerHTML="";
                    displayPreview(currImg-7)                        
                }else{
                    displayPreview(0);
                }            
            }

            function removePreviousStuff(){
                document.querySelector('.screen').innerHTML="";
                document.querySelector('.image').innerHTML="";
                document.querySelector('.stores').innerHTML="";
                document.querySelector('.platforms').innerHTML="";
                document.querySelector('.previewCards').innerHTML="";
            }

            function displayPreview(starting){
                var html;
                document.querySelector('.previewCards').innerHTML="";

                for(var i=starting;i<(starting+4)&&videoImage.length;i++){
                    if(i===0&&game.clip)
                    html = '<div class="preview-card" ><img src="./resources/video-placeholder.jpg" width="128px" height="98px"  id="video"></div>';

                    else{
                        html = '<div class="preview-card" ><img src="%url%" width="128px" height="98px"  id="image"></div>';
                        html = html.replace("%url%",videoImage[i]);
                    }
                    currImg=i;
                    document.querySelector('.previewCards').insertAdjacentHTML('beforeend',html);
                }
            }                                     
            

        }
    }
})

