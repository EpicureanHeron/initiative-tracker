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



//initiliazes the power of jQuery
$(document).ready(function() {

    documentWrite()

    $('body').on('click', '.chooseable', function () {
        
       var index = $(this).attr("playerArrIndex");

       var NewInit = prompt("What is the characters init?");

       playerArr[index].init = NewInit
       console.log(playerArr)
       documentWrite()
    })
    //clicking the sort button sorts the PCs by init and then generates that order on screen
    $("#sort").click(function() {
        
        sortByInit();
        console.log(playerArr)

        populateOrder()
        documentWrite()


    })

   
});

function documentWrite() {

    for (i = 0; i < playerArr.length; i++) {
        $(playerArr[i].playerID).html("<p>"+ playerArr[i].name + "<br>" +"init: " + playerArr[i].init + "</p>");
    }
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
function newEnemy() {

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