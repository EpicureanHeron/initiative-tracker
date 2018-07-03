//TODO
//1. Create a Dead/Remove button on each character which allows them to be display: none. This may only need to be on enemies
//2. following up on 1, for each PC have a fillable field which says something like "status" where we can mark if they are concious/unconcious (rather than removing them completely)
//3. updating init via click after enemy is created does not work, gets an error saying something like "undefined does not have init"
//4. sometimes when init is overwritten, it does not show on the character

//BUG TO SQUASH: cannot update a enemy's init getting a "Uncaught TypeError: Cannot read property 'init' of undefined" but it is defined... but undefined may be referring to not passing an element playerArrIndex to the enemey
//The above issue may be resolved with a function that is updateIndexes which cycles through the DOM objects and updates their playerArrindex...
//all of the below are player character objects

//splicing from array removes object, but DOM is just hiding with display NONE, so not updating the DOM object with the removal
//This causes the item that is at the first position (it seems) to be stuck because when playerArrIndex is reassigned, getting duplicate entries
//



var config = {
    apiKey: "AIzaSyBjLANkmBsmol5gNQ7KIWhPXDKoq9fBNw0",
    authDomain: "inittracker-95d8c.firebaseapp.com",
    databaseURL: "https://inittracker-95d8c.firebaseio.com",
    projectId: "inittracker-95d8c",
    storageBucket: "",
    messagingSenderId: "579669158672"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
var dinty = {
    name: "Dinty",
    playerID: "#dinty",
    img: "assets/images/dinty.jpg",
    init: 0,
}

var dymby = {
    name: "Dymby",
    playerID: "#dymby",
    img: "assets/images/dymby.jpg",
    init: 0
}

var tarkus = {
    name: "Tarkus",
    playerID: "#tarkus",
    img: "assets/images/tarkus.jpeg",
    init: 0
}

var magthar = {
    name: "Magthar",
    playerID: "#magthar",
    img: "assets/images/magthar.jpg",
    init: 0
}

var sheldon = {
    name: "Sheldon",
    playerID: "#sheldon",
    img: "assets/images/sheldon.png",
    init: 0
}

//array featuring just the PC objects


var monsterArr = ["assets/images/warg.png", "assets/images/goblin.jpeg", "assets/images/troll.jpeg", "assets/images/dragon.jpg",'assets/images/skeleton.jpg', 'assets/images/minotaur.jpg', "assets/images/golem.jpg", "assets/images/treant.jpg"]

var playerArr = [dinty, dymby, tarkus, magthar, sheldon]

//initializes the combantantArr which is an empty array
var combantantArr = [];

//hopefully will work with the create enemy button which will iterate this up so we can create object enemy1, enemy2, etc
var enemyCounter = 0;

//has sort been pressed? 
var sortPressed = false;
//variable that gets added to, hopefully used in the nextCharacter()
var activePlayerIndex = 0;


function initiateDatabasePCs(array){
    for(i = 0; i < array.length; i ++){
        database.ref("chars/" + array[i].name).set({
            dataAdded: firebase.database.ServerValue.TIMESTAMP,
            init: array[i].init,
            name: array[i].name,
            playerID: array[i].playerID,
            img: array[i].img
          })
        }

        database.ref("round").set({
            dataAdded: firebase.database.ServerValue.TIMESTAMP,
            roundNumber: 0
          })
    }

initiateDatabasePCs(playerArr)
//initiliazes the power of jQuery
$(document).ready(function() {
    //updates the page with the PC stats in blocks
    documentWrite()

    //listens to clicks on the divs with a class of chooseable
    $('body').on('click', '.chooseable', function () {
        // grabs the index from the html 
        var index = $(this).attr("playerArrIndex");
        var clickedName = $(this).attr("name");
        console.log(clickedName)
        // checks to see if the init has been established or not

        //THE BELOW IS NEWLY ADDED but not working 
        //Probably has something to do with the playerArrIndex on the index.html and splicing that and not updating other things...
        if (playerArr[index].init > 0) {
            //asks the question if this object should be removed
            var removal = confirm("Hit OK to Remove and cancel to set new Init.")
            //if removal is accepted 
            if (removal) {
                //add the class dead (which is display: none)
                $(this).remove()
                //I don't know if this is working, the index is being pulled from the object on the HTML side...so this could cuase issues
                playerArr.splice(index, 1)
                console.log(playerArr)
                //after removing, need to step through the playerArr and reassign the the index values. This is currently causing issues
            }

            else {
                var newInit = prompt("What is the characters init?");

                playerArr[index].init = newInit
                
                documentWrite()

            }


        }
        else {
       //each .chooseable also has an attribute of playerArrIndex which is associated with whatever is chosen
       

       //asks the user for a new init number
       //need to limit this to numbers only
       var newInit = prompt("What is the characters init?");

       //sets the init from the prompt on to the PC inits in the PC array
       playerArr[index].init = newInit
       console.log(clickedName)
       database.ref("chars/" + clickedName).update({
           dataUpdated: firebase.database.ServerValue.TIMESTAMP,
           init: newInit,
         })
       //updates the combantantArr with the updated PC arr
       //FOR WHATEVER REASON, THIS IS NOT WORKING THE WAY I THINK WORKS

       documentWrite()
        }
    })
    //clicking the sort button sorts the PCs by init and then generates that order on screen
    $("#sort").click(function() {
        sortPressed = true;
        sortByInit();
        console.log(playerArr)
        
        populateOrder()
        // documentWrite()


    })
    $("#newEnemy").click(function(){
        
        //prompts user for name of enemy and saves it 
        var newname=  prompt("name for enemy")
       //prompts user for the initiative of enemy
        var init = prompt("init?")
        //constructs a new enemy based on the class Enemy

        var uniqueID = "enemy" + enemyCounter;
        var indexForImage = Math.floor(Math.random() * monsterArr.length); 
        var randomImage  = monsterArr[indexForImage]
        var Enemy = new NewEnemy(newname, init, uniqueID, randomImage);
        
        playerArr.push(Enemy)

        //need to grab the index for the monster and save it somewhere...potentially. 

        console.log(Enemy)

        console.log(playerArr)

        var newDiv = $("<div>");

        newDiv.addClass("enemy chooseable");

        newDiv.attr("id", uniqueID);

        var newPlayerArrIndex =  playerArr.length -1

        newDiv.attr("playerArrIndex", newPlayerArrIndex)

        console.log(newPlayerArrIndex)

        newDiv.html("<p>" + Enemy.name +"<br> init: " +Enemy.init + "</p> <img src='"+ Enemy.img +"'>")

        $("#fighterDisplay").append(newDiv);

        enemyCounter ++;

        console.log(Enemy)

    })

    $("#nextTurn").click(nextCharacter)
});

function documentWrite() {
  
        for (i = 0; i < playerArr.length; i++) {
            $(playerArr[i].playerID).html("<p>"+ playerArr[i].name + "<br>" +"init: " + playerArr[i].init + "</p>" + "<img src='"+playerArr[i].img+"'>");
            $(playerArr[i].playerID).attr("name", playerArr[i].name)
    }
   
}
//this is a SHOULD be a class
function NewEnemy(name, init, playerID, randomImage) {
    this.name = name;
    this.init = init;
    this.playerID = "#" + playerID;
    this.img = randomImage;
    
}

function sortByInit() {
    console.log(playerArr)
    //found the code here http://www.javascriptkit.com/javatutors/arraysort2.shtml
    playerArr.sort(function(a, b){
        return a.init-b.init
    })
}
//updates the state of the screen so whoever is in the index[1] spot of the screen is moved to the [0] spot and the index [0] is moved to the back
function nextCharacter() {
    var currentTop = playerArr[0]

    $(currentTop.playerID).removeClass("active")
    
   
    playerArr.splice(0,1)
    playerArr.push(currentTop)
    $(playerArr[0].playerID).addClass("active")
    $("#fighterDisplay").append($(currentTop.playerID))

    console.log(playerArr[0])

}
//removes character from the queue (with options that it comes back, this is probably a "revive " function)
function killCharacter(character) {

}

//orders the figherArr based on init 
function populateOrder() {
    //method which reverses the order of the array
    playerArr.reverse()
    $(playerArr[0].playerID).addClass("active");

    for (i = 0; i < playerArr.length; i++) {
        if (!playerArr[0]) {
            playerArr[i].playerID.removeClass("active");
        }
        var divToMove = $(playerArr[i].playerID)
        divToMove.attr("playerArrIndex", i)
        $("#fighterDisplay").append(divToMove)

    }
}