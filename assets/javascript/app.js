//page test
//console.log("Hello!")

// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyDhlxp7gYlyEK-z6nH2iHB9XLLUTHTRqgs",
    authDomain: "train-timetable-2354d.firebaseapp.com",
    databaseURL: "https://train-timetable-2354d.firebaseio.com",
    projectId: "train-timetable-2354d",
    storageBucket: "train-timetable-2354d.appspot.com",
    messagingSenderId: "1061261061365",
    appId: "1:1061261061365:web:28cfad9495e24192"
};
  // Initialize Firebase
firebase.initializeApp(config);

var trainData = firebase.database();
$("#submit").on("click", function(){
    var trainName = $("#train-name").val.trim();
    var destination = $("#train-destination").val.trim();
    var firstTrain = moment($("#train-time").val().trim(),"HH:mm").subtract(10,"years").format("x");
    var frequency = $("#train-frequency").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    }

    trainData.ref().push(newTrain);
    alert("Train Added!");

    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#train-frequency").val("");

    return false;
})