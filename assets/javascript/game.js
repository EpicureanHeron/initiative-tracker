var dinty = {
    name: "Dinty",
    init: 0,
}

var dymby = {
    name: "Dymby",
    init: 0

}


var tarkus = {
    name: "Tarkus",
    init: 0
}

var magthar = {
    name: "Magthar",
    init: 0
}

var sheldon = {
    name: "Sheldon",
    init: 0
}

var playerArr = [dinty, dymby, tarkus, magthar, sheldon]

//initiliazes the power of jQuery
$(document).ready(function() {
   
    $('body').on('click', '.chooseable', function () {
      
        
       var index = $(this).attr("playerArrIndex")

       console.log(playerArr[index].name)
    })
});
