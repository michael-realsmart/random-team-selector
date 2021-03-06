//CREATE ALL OF THE VARIABLES
var input = document.getElementById("input");
var submit = document.getElementById("submit");
var output = document.getElementById("output");
var teamRed = document.getElementById("teamRed");
var teamBlue = document.getElementById("teamBlue");
var myArray = [];
var list = '';
var list2 = '';
var list3 = '';

//SHUFFLE FUNCTION USED IN LOWDASH, this is called later
function shuffle(arrayToShuffle) {
    var counter = arrayToShuffle.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        var temp = arrayToShuffle[counter];
        arrayToShuffle[counter] = arrayToShuffle[index];
        arrayToShuffle[index] = temp;
    }

    return arrayToShuffle;
}

//ADD THE USERS/PLAYERS
submit.addEventListener('click', function(e) { // watch the item called sumbit for a click event

  e.preventDefault(); //i think this prevents an empty player being added
  myArray.push(input.value); //take the values from input and push it to myArray
  storePlayers(myArray);
  //output.innerHTML = myArray.toString(); //add the input to the list called output and make sure it's a string
  input.value = ''; //empty the input field after all the above is complete
  renderPlayerList();

});

//function to render players from an array
function renderPlayerList() {
  listHTML = '';

  for (var i = 0, l = myArray.length; i < l; i++) {
    listHTML += '<li>' + myArray[i] + '<span class="removePlayer" onclick="removePlayer('+ i + ')">&times;</span></li>';
  }

  output.innerHTML = listHTML;
}

//removePlayer FUNCTION
function removePlayer(playerIndex) {
  console.log(playerIndex);
  myArray.splice(playerIndex, 1);
  storePlayers(myArray);
  renderPlayerList();
}

//SHUFFLE AND DISPLAY THE TWO TEAMS
function genrateTeams() {

	shuffle(myArray);
	//console.log(myArray);
	var team1 = myArray.slice(0, myArray.length / 2);
	var team2 = myArray.slice(myArray.length / 2, myArray.length)
	//console.log(team1);
	//console.log(team2);
	list2 = '';
	list3 = '';

	for (var i = 0, l = team1.length; i < l; i++) {
    list2 += '<li><span class="glyphicon glyphicon-user"></span>' + team1[i] + '</li>';
  }

	teamRed.innerHTML = list2;

	for (var i = 0, l = team2.length; i < l; i++) {
    list3 += '<li><span class="glyphicon glyphicon-user"></span>' + team2[i] + '</li>';
  }

	teamBlue.innerHTML = list3;
};

// create/update a list of players in the users local storage
function storePlayers(listOfPlayers) {
  var players = JSON.stringify(listOfPlayers);
  // Store
  localStorage.setItem("previousPlayers", players);
}

// attempt to retreive a list from local storage on the users browser
function getPlayers() {
  var players = localStorage.getItem("previousPlayers");
  if (players) {
    myArray = JSON.parse(players);
    renderPlayerList();
  }
  //console.log(players);
}

getPlayers();
