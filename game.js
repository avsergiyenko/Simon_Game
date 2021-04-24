var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).on("keydown", function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})


function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
//  Detect Clicks

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.indexOf(userChosenColour));
})

//  Play Sounds

function playSound(name) {
  var music = new Audio("sounds/" + name + ".mp3"); // sounds/blue.mp3
  music.play();
}

// Button Animation

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed", setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100));
}
//  Check Answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over", setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200));
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
//  Restart game
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
  userClickedPattern = [];
}
