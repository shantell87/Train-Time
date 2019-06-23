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

//the trainData variable is going to serve as a reference to firebase
//everytime the submit button is clicked the input info will be stored
var trainData = firebase.database();

//click submission button, add new train data
$("#submit").on("click", function(event){
    event.preventDefault();

//new train data
    let trainName = $("#train-name").val().trim();
    let destination = $("#train-destination").val().trim();
    let firstTrain = moment($("#train-time").val().trim(), "HH:mm").subtract(10, "years").format("x");
    let frequency = $("#train-frequency").val().trim();

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

trainData.ref().on("child_added", function(snapshot){
    let name = snapshot.val().name;
    let destination = snapshot.val().destination;
    let frequency = snapshot.val().frequency;
    let firstTrain = snapshot.val().firstTrain;

    let remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
    let minutes = frequency - remainder;
    let arrival = moment().add(minutes,"m").format("hh:mm A");

    // console.log(remainder);
    // console.log(minutes);
    // console.log(arrival);

    //New train being added to the table body
    $("#trainTable > tbody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td><tr>");

})