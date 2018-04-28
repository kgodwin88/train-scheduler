$(document).ready(function(){
    var config = {
        apiKey: "AIzaSyCkuhVjcpLlDdOL2bfXD2bf9RI_5zm4o1o",
        authDomain: "week-7-1d08c.firebaseapp.com",
        databaseURL: "https://week-7-1d08c.firebaseio.com",
        projectId: "week-7-1d08c",
        storageBucket: "week-7-1d08c.appspot.com",
        messagingSenderId: "834540264954"
        };
    firebase.initializeApp(config);
    
    var database = firebase.database();
    

    $("#addTrain").on("click", function(){
        
        event.preventDefault();
        var name = $("#name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = moment($("#firstTrain").val().trim(), "HH:mm").format("hh:mm");
        var frequency = $("#frequency").val().trim();
        console.log(Number.isInteger(parseInt(frequency)));
        console.log(firstTrain)
        if(name === ""){
            alert("Please enter a valid Train Name");
        }
        else if(destination === ""){
            alert("Please enter a valid Destination");
        }
        else if(firstTrain === "Invalid date"){
            alert("Please enter a valid Time")
        }
        else if (frequency === "" || Number.isInteger(parseInt(frequency)) === false){
            alert("Please enter a Valid number for the frequency")
        }
        else{
        
        var newTrain = {
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            
        };
        database.ref().push(newTrain);
        $("#trainForm")[0].reset();
    }
    });
    database.ref().on("child_added", function(snapshot){
        var name = snapshot.val().name;
        var destination = snapshot.val().destination;
        var firstTrain = snapshot.val().firstTrain;
        var frequency = snapshot.val().frequency;
        var diffTime = moment().diff(moment(firstTrain, "X"), "minutes")
        var remainder = diffTime % frequency;
        var tillNextTrain = frequency - remainder;
        var nextTrain = moment().add(tillNextTrain, "minutes");
        
        $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tillNextTrain + "</td></tr>");
       
    });

});