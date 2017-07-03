  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAc1GcAhC7YjANCcAW-klEbW5i9lBgltcY",
    authDomain: "inar-85a94.firebaseapp.com",
    databaseURL: "https://inar-85a94.firebaseio.com",
    projectId: "inar-85a94",
    storageBucket: "inar-85a94.appspot.com",
    messagingSenderId: "998141047840"
  };
  firebase.initializeApp(config);

var database = firebase.database();


// loading the teams

function setup() {
database.ref('teams').orderByChild("name").limitToLast(100).on("child_added", function(childSnapshot) {
    console.log("Child Added setup");
    teamHeader = $("#teams").html(
    	"<h2 class='h2 h2-default'>Registered Teams</h2>" +
	    "<div class='col-lg-2 firstRow'>Team Name</div>" + 
	    "<div class='col-lg-2 firstRow'>Captain</div>" + 
	    "<div class='col-lg-2 firstRow'>Deputy</div>" + 
	    "<div class='col-lg-2 firstRow'>Player 3</div>" + 
	    "<div class='col-lg-2 firstRow'>Player 4</div>" +
	    "<div class='col-lg-2 firstRow'>Preferred Start Time</div>"
	    )


  teamList = $("#teams").append(
    "<div class='col-lg-2 newRow'>" + childSnapshot.val().teamName + 
    "</div> <div class='col-lg-2 newRow'>" + childSnapshot.val().captain + 
    "</div><div class='col-lg-2 newRow'>"+ childSnapshot.val().deputy + 
    "</div><div class='col-lg-2 newRow'>" + childSnapshot.val().player3 +
    "</div><div class='col-lg-2 newRow'>" + childSnapshot.val().player4 +
    "</div><div class='col-lg-2 newRow'>" + childSnapshot.val().time +
    "</div>");
  
    $("#teams").append(teamList);
  })
};

// Adding new teams to the database
$(document).on("click", "#submit", function(event) {
	event.preventDefault();
	var teamName = $("#teamName").val().trim();
	var captainName = $("#captainName").val().trim();
	var captainEmail = $("#captainEmail").val().trim();
	var deputyName = $("#deputyName").val().trim();
	var deputyEmail = $("#deputyEmail").val().trim();
	var player3 = $("#player3").val().trim();
	var player4 = $("#player4").val().trim();
	var preferredTime = $("#preferredTime").val().trim();
	var comments = $("#comments").val().trim();

if ( !captainName || !captainEmail || !deputyName || !deputyEmail || !teamName ) return;
 
  database.ref('teams').push({
    teamName: teamName,
    captain: captainName,
    captainEmail: captainEmail,
    deputy: deputyName,
    deputyEmail: deputyEmail,
    player3: player3,
    player4: player4,
    time: preferredTime,
    comments: comments,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  	 });
  $("#teamName").val("");
  $("#captainName").val("");
  $("#captainEmail").val("");
  $("#deputyName").val("");
  $("#deputyEmail").val("");
  $("#player3").val("");
  $("#player4").val("");
  $("#preferredTime").val("");
  $("#comments").val("");

  });

setup();