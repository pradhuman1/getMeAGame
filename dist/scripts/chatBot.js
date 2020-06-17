"use strict";

var searchForGame = false;
var smallCard = false;
var Data;
var gameName = [{
  name: "Portal 2",
  slug: "portal-2"
}, {
  name: "Portal",
  slug: "portal"
}, {
  name: "Grand Theft Auto V",
  slug: "grand-theft-auto-v"
}];
var inputtxt = document.querySelector('.userInput');
var slug;

function autoComplete(inputtxt, gameName) {
  var val, i, html;
  inputtxt.addEventListener("input", e => {
    closeAllLists();
    val = inputtxt.value;

    if (val) {
      for (var i = 0; i < gameName.length; i++) {
        slug = null;

        if (gameName[i].name.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
          html = '<div class="suggestion %name%" id="%slug%"><strong>matched</strong>remaining</div>';
          html = html.replace("matched", gameName[i].name.substr(0, val.length));
          html = html.replace("remaining", gameName[i].name.substr(val.length));
          html = html.replace("%slug%", gameName[i].slug);
          document.querySelector('.sugg-area').insertAdjacentHTML('afterbegin', html);
        }
      }
    }
  });
  document.querySelector('.sugg-area').addEventListener('click', e => {
    val = e.target.textContent;
    inputtxt.value = val;
    slug = e.target.id;
    closeAllLists();
  });
  document.querySelector('body').addEventListener('click', e => {
    closeAllLists(e.target);
  });
}

function closeAllLists(el) {
  if (el !== inputtxt) document.querySelector('.sugg-area').innerHTML = "";
}

function seeMore(data) {
  document.querySelector('.show-more').id = "smallCard-" + data._id;
  document.querySelector('.card').addEventListener('mouseover', () => {
    document.querySelector('.seeMore-smallCard').style.display = "block";
  });
  document.querySelector('.card').addEventListener('mouseout', () => {
    document.querySelector('.seeMore-smallCard').style.display = "none";
  });
}

document.querySelector('.options').addEventListener('click', e => {
  if (e.target.id === "giveInfo" || e.target.id === "recommend") {
    var msg = document.getElementById(e.target.id).textContent;
    DisplayMessage(msg, "user");

    if (e.target.id === "giveInfo") {
      writingIndicator(true);
      setTimeout(() => {
        writingIndicator(false);
      }, 1000);
      setTimeout(function () {
        DisplayMessage("For which game do you want to get information");
        searchForGame = true;
        autoComplete(inputtxt, gameName);
      }, 1100);
    }
  }
});

function writingIndicator(add) {
  if (add) {
    var html = '<div class="botChat"><div class="botMsg waiting"><div class="ticontainer"><div class="tiblock"><div class="tidot"></div><div class="tidot"></div><div class="tidot"></div></div></div></div></div>';
    document.querySelector('.chat-area').insertAdjacentHTML('beforeend', html);
  } else {
    var list = document.querySelector('.chat-area');
    var last = list.childNodes.length;
    last--;
    list.removeChild(list.childNodes[last]);
  }
}

document.querySelector('body').addEventListener('keypress', e => {
  if (e.keyCode === 13) {
    var newUserMsg = document.querySelector('.userInput').value;
    DisplayMessage(newUserMsg, "user");

    if (searchForGame) {
      writingIndicator(true);
      var newGame = new game(newUserMsg, slug);
      var options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGame)
      };
      fetch('http://localhost:8000/gameName', options).then(res => {
        res.json().then(data => {
          Data = data[0];
          displaySmallCard(data);
        });
      });
    }

    searchForGame = false;
  }
});

var game = function (name, slug) {
  this.name = name.trim();
  this.slug = slug;
};

function displaySmallCard(data) {
  data = data[0];
  writingIndicator(false);

  if (data) {
    smallCard = true;
    var html = '<div class=botChat><div class="botMsg result"></div><div class="tellTo-getInfo" style="font-family:Ubuntu, sans-serif">Click on card to get detailed information</div> </div>';
    document.querySelector('.chat-area').insertAdjacentHTML('beforeend', html);
    html = '<div class=card ><div class="smallImg"><img src=%imgUrl% class=smallImg ><div class="seeMore-smallCard"><div class="show-more" id="">SEE MORE</div></div></div>%gameName%</div>';
    html = html.replace("%imgUrl%", data.background_image);
    html = html.replace("game-slug", data.slug);
    html = html.replace("game-slug", data.slug);
    html = html.replace("%gameName%", data.name);
    var el = document.querySelectorAll(".result");
    var lastEl = el.length - 1;
    el[lastEl].insertAdjacentHTML('beforeend', html);
    seeMore(data);
  } else {
    DisplayMessage("Sorry, I don't know about this game", "bot");
  }
}

document.querySelector('.chat-area').addEventListener('click', e => {
  var flag = e.target.id.split('-')[0];

  if (flag == "smallCard") {
    displayFullCard(e.target.id);
  }
});

function DisplayMessage(msg, provider) {
  if (msg) {
    if (provider === "user") var html = "<div class=userChat><div class=userMsg>%msg%</div></div>";else var html = "<div class=botChat><div class=botMsg>%msg%</div></div>";
    html = html.replace('%msg%', msg);
    document.querySelector('.chat-area').insertAdjacentHTML('beforeend', html);
    clearInputArea(); //put Scroll to bottom

    var objDiv = document.querySelector(".chat-area");
    objDiv.scrollTop = objDiv.scrollHeight;
  }
}

function clearInputArea() {
  document.querySelector('.userInput').value = "";
}

function displayFullCard(game) {
  if (game) {
    globalData = Data;
    document.querySelector('.popup').style.display = "flex";
  }
}