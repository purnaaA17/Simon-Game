var userPattern = [];
var gamePattern = [];
var started = false;
var level = 0;
var availableColors = ["red","green","yellow","blue"];
function nextSequence(){
    userPattern=[];
    level++;
    var randomNumber = Math.floor(Math.random()*4);
    var chosenColors = availableColors[randomNumber];
    playSound(chosenColors);
    gamePattern.push(chosenColors);
    $("."+chosenColors).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    $("h1").text("Level "+level);
}
function playSound(event){
    var a = new Audio("./sounds/"+event+".mp3");
    a.play();
}
function checkGame(level){
    if(userPattern[level] === gamePattern[level]){
        if(gamePattern.length===userPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }       
        
    }
    else{
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");  
        },2000);
        startOver();
    }
}
$(".btn").click(function(){
    var userColor = $(this).attr("id");
    playSound(userColor);
    userPattern.push(userColor);
    var len = userPattern.length-1;
    animatePress(userColor);
    checkGame(len);
});
function animatePress(event){
    $("."+event).addClass("pressed");
    setTimeout(function(){
        $("."+event).removeClass("pressed");
    },100);
}
$(document).on("keypress",function(){
    if(!started){
        $("h1").text("level "+ level);
        nextSequence();
        started=true;
    }
})
function startOver(){
    level=0;
    started=false;
    gamePattern=[];
    $("h1").text("Game Overrr Press A Key to Restart");
}