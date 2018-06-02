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

    $("#sort").click(function() {
        
        sortByInit();
        console.log(playerArr)
        documentWrite()


    })

    $("#fourthElement").click(function() {
        console.log(playerArr[4].name)
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

function killCharacter(character) {

}

function newEnemy() {

}