//TODO

//Tried to sort the combantantArr by init like I do with the PlayerArr, but for whatever reason the sorting is not working, it seems randomly out of order.

//Need to generate a new <div> with its own placement when an enemey is created

//Not sure if I can create multiple enemies with the "constructor" I am using




var dinty = {
    name: "Dinty",
    playerID: "#dinty",
    init: 0,
}

var dymby = {
    name: "Dymby",
    playerID: "#dymby",
    init: 0
}

var tarkus = {
    name: "Tarkus",
    playerID: "#tarkus",
    init: 0
}

var magthar = {
    name: "Magthar",
    playerID: "#magthar",
    init: 0
}

var sheldon = {
    name: "Sheldon",
    playerID: "#sheldon",
    init: 0
}

var playerArr = [dinty, dymby, tarkus, magthar, sheldon]

var combantantArr = [];

var enemyCounter = 0

var sortPressed = false;

//initiliazes the power of jQuery
$(document).ready(function() {

    documentWrite()

    $('body').on('click', '.chooseable', function () {
        
       var index = $(this).attr("playerArrIndex");

       var NewInit = prompt("What is the characters init?");

       playerArr[index].init = NewInit

       combantantArr.push(playerArr[index])

       console.log(playerArr)
       documentWrite()
    })
    //clicking the sort button sorts the PCs by init and then generates that order on screen
    $("#sort").click(function() {
        sortPressed = true;
        sortByInit();
        console.log(playerArr)

        populateOrder()
        documentWrite()


    })
    $("#newEnemy").click(function(){
        
        //prompts user for name of enemy and saves it 
        var newname=  prompt("name for enemy")
       //prompts user for the initiative of enemy
        var init = prompt("init?")
        //constructs a new enemy based on the class Enemy


        var Enemy = new NewEnemy(newname, init);

        combantantArr.push(Enemy)

        console.log(Enemy)

        console.log(combantantArr)


    })
   
});

function documentWrite() {
  
        for (i = 0; i < playerArr.length; i++) {
            $(playerArr[i].playerID).html("<p>"+ playerArr[i].name + "<br>" +"init: " + playerArr[i].init + "</p>");
    }
   
}
//this is a class
function NewEnemy(name, init) {
    this.name = name;
    this.init = init;
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

}
//removes character from the queue (with options that it comes back, this is probably a "revive " function)
function killCharacter(character) {

}

//Create an enenmy NPC
function newEnemy(name, init) {




}
//orders the figherArr based on init 
function populateOrder() {
    //method which reverses the order of the array
    playerArr.reverse()
    for (i = 0; i < playerArr.length; i++) {
        
        var divToMove = $(playerArr[i].playerID)

        $("#fighterDisplay").append(divToMove)

    }
}