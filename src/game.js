
let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let isStarted = false;

let level = 0;


$(document).keypress(function() {

    if (!isStarted) {
        
        $("#next-level").text("level" + level);
        nextSequence();
        isStarted = true;
    }
});

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    animatePress(userChosenColour);
    playSound(userChosenColour);
});


function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");


        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        let wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press any key to restart");
        startOver();
    }
}

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.random();
    randomNumber = randomNumber * 4;
    randomNumber = Math.floor(randomNumber);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    
}

function playSound(id) {
    let audio = new Audio("sounds/" + id + ".mp3");
    audio.play();
}


function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    isStarted = false;
    level = 0;
    gamePattern = [];
}