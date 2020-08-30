$("body").keypress(start_game);
var first_time=true;
var colorList = ["green","red","yellow","blue"];
var levelCleared = true;
var level=1;

function blinkButton(x,randomIndex)
{

        setTimeout(function(){
            //console.log(colorList[randomIndex]);
            $("."+colorList[randomIndex]).fadeToggle(100);
            var audio = new Audio("sounds/"+colorList[randomIndex]+".mp3");
            audio.play();
            $("."+colorList[randomIndex]).fadeToggle(200);
        },500*(x+1));
}

function randomIndexGenerator(level) //x is no. of random numbers wanted
{
    //console.log("randomIndexGenerator()");
    var randomIndex=[];
    for(var x=0;x<level+1;x++){
        randomIndex.push(Math.floor(Math.random()*4));
    }
    return randomIndex;
}

function gameOver()
{
    $("body").addClass("game-over");
    $("#level-title").text("Game Over!");
    levelCleared=false;
}

function executeLevel(level)
{
    $("#level-title").text("Level "+level); //set level heading
    var randomIndex =  randomIndexGenerator(level);
    for(let x=0;x<randomIndex.length;x++)
    {
        blinkButton(x,randomIndex[x]);
    }
    var clickedIndex=0;
    $(".btn").click(function(event) {

        if(levelCleared && clickedIndex<randomIndex.length)
        {
            //console.log(this.id+" clicked "+clickedIndex);

            if(colorList[randomIndex[clickedIndex]]===this.id)
            {
                var audio = new Audio("sounds/"+colorList[randomIndex[clickedIndex]]+".mp3");
                audio.play();
                //console.log("correct");
            }
            else
            {
                //console.log("wrong");
                gameOver();
            }

            if(levelCleared && clickedIndex==randomIndex.length-1)
            {
                $("#level-title").text("Level Cleared!");
                level++;
                executeLevel(level);
            }

            clickedIndex++;
        }
        else
        {
            //console.log("game already over clickedIndex "+clickedIndex);
        }
    });
}

function start_game()
{
    //console.log("69 keypressed");
    if(first_time)
    {
        first_time=false; //boolean to indicate the start of game
        executeLevel(level);
    }

}
