let gamePattern= [];
let userGamePattern=[];
let gameStarted = false;
let level = 0;


const buttonColors = ["red","blue","green","yellow"];


function nextSequence(){

    
    userGamePattern=[];
    // generating random number and push to random button to sequence3
    let randomNumber = Math.floor (Math.random() * 4);
    let randomColorChosen = buttonColors[randomNumber];
    gamePattern.push(randomColorChosen);
    console.log(gamePattern);

    // blinks new button in sequence
    $("#"+randomColorChosen).fadeOut(100).fadeIn(100);
    playSound(randomColorChosen);
    level=level+1;
    $("h1").text("level "+ level);
}

// user click handler
$(".btn").on("click",function(){
    // pushing clicked buttons to user array, of buttons user clicked
    let userChosenColor = $(this).attr("id"); // this returns an object with info of element who triggered function
    
    userGamePattern.push(userChosenColor);
    
    // play sound of color when user clicks it
    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log("user clicked: " + userGamePattern + " ");
    checkAnswer(userGamePattern.length-1);
    
})

// function of playSound

function playSound(name){
    // play sound when new color enters sequence
    new Audio("./sounds/"+name+".mp3").play();
    
}

// animate press function
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(()=>{
        $("#"+currentColor).removeClass("pressed");
        
    },100)
}


// start the game
$(document).on("keydown",()=>{
    
    if(!gameStarted){
        nextSequence();
        gameStarted=true;
    }
})


function checkAnswer(currentIndex){
    if(userGamePattern[currentIndex]==gamePattern[currentIndex]){
        console.log("success");    
        
        if(userGamePattern.length==gamePattern.length){
            
            setTimeout(()=>{
                nextSequence();
            },1000)
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        
        // on wrong, background goes red for a seconds
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200)

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
        
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    gameStarted=false;
}