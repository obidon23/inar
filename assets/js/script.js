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
  var teamName = $("#teamName").val().trim();
  var captainName = $("#captainName").val().trim();
  var captainEmail = $("#captainEmail").val().trim();
  var deputyName = $("#deputyName").val().trim();
  var deputyEmail = $("#deputyEmail").val().trim();
  var player3 = $("#player3").val().trim();
  var player4 = $("#player4").val().trim();
  var preferredTime = $("#preferredTime").val().trim();
  var comments = $("#comments").val().trim();

// var myModal = $(".mocal-content").html("<div class="modal-header"></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="close" data-dismiss="modal">&times;</button></div>")<div class="modal-header">  
//               </div>
//             <div class="modal-body">
                
//               </div>
//               <div class="modal-footer">
//                 <button type="button" class="close" data-dismiss="modal">&times;</button>
//               </div>

// loading the teams

function setup() {
var teamHeader = $("#teams").html(
      "<h2 class='h2 h2-default'>Registered Teams</h2>" +
      "<div class='col-lg-2 firstRow'>Team Name</div>" + 
      "<div class='col-lg-2 firstRow'>Captain</div>" + 
      "<div class='col-lg-2 firstRow'>Deputy</div>" + 
      "<div class='col-lg-2 firstRow'>Player 3</div>" + 
      "<div class='col-lg-2 firstRow'>Player 4</div>" +
      "<div class='col-lg-2 firstRow'>Preferred Start Time</div>"
      );
database.ref('teams').orderByChild("name").limitToLast(100).on("child_added", function(childSnapshot) {
    console.log("Child Added setup");
    
  teamList = $("#teams").append(
    "<div class='col-lg-2 newRow'>" + childSnapshot.val().teamName + 
    "</div> <div class='col-lg-2 newRow'>" + childSnapshot.val().captain + 
    "</div><div class='col-lg-2 newRow'>"+ childSnapshot.val().deputy + 
    "</div><div class='col-lg-2 newRow'>" + childSnapshot.val().player3 +
    "</div><div class='col-lg-2 newRow'>" + childSnapshot.val().player4 +
    "</div><div class='col-lg-2 newRow'>" + childSnapshot.val().time +
    "</div>");
  
    $("#teams").append(teamList);
  });
}

// Validating teh form
$(document).on("click", "#submit", function(event) {
  event.preventDefault();
   validateForm();
});
// This function will update the firebase
function pushForm() { 
  teamName = $("#teamName").val().trim();
  captainName = $("#captainName").val().trim();
  captainEmail = $("#captainEmail").val().trim();
  deputyName = $("#deputyName").val().trim();
  deputyEmail = $("#deputyEmail").val().trim();
  player3 = $("#player3").val().trim();
  player4 = $("#player4").val().trim();
  preferredTime = $("#preferredTime").val().trim();
  comments = $("#comments").val().trim();

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
 
  $(".modal-header").html("<h3>Thanks for signing up!</h3>");
  $(".modal-body").html("<p>You are registered for the Incredible Not-A-Race. Your team name and members can still be modified between now and August 4th. You will receive an email with more information in the next 24 hours.</p>");

  };
function validateForm() {
  teamName = $("#teamName").val().trim();
  captainName = $("#captainName").val().trim();
  captainEmail = $("#captainEmail").val().trim();
  deputyName = $("#deputyName").val().trim();
  deputyEmail = $("#deputyEmail").val().trim();
  if ( captainName && captainEmail && deputyName && deputyEmail && teamName) {
      pushForm();
 
}
  else {
    $(".modal-header").html("<h3>Oops! Something went horribly wrong!</h3>");
    $(".modal-body").html("<p>Please fill out all  of the required fields (*).</p>");
    return;   }

}
setup();