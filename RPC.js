function getChoice() {
    return new Promise((resolve, reject) => {
        let isResolved = false;
        const itemClicked = document.getElementsByClassName("item");  //Collection of images
        for (const item of itemClicked) {
            item.addEventListener("click", () => {
                if (isResolved){
                    return
                }
                console.log("Clicked " + item.id);
                let itemChosen = item.id;
                const outputElement = document.getElementById("playerChoice");
                outputElement.innerHTML = "Your choice is: " + itemChosen;
                
                if (itemChosen != null) {
                    isResolved = true
                    resolve(itemChosen);
                } else {
                    reject("Errr");
                }
            })
        }
    })
}

async function game() {
    const valid = ["rock", "paper", "scissors"];
    const computerChoice = valid[Math.floor(Math.random() * valid.length)];

    const playChoiceResult = await getChoice();
    const playButton = document.getElementById("play");
    playButton.addEventListener("click", () => {
        // Play is clicked
        let str1 = ("You have played: " + playChoiceResult)
        let str2 = ("Computer has played: " + computerChoice)
        document.getElementById("output").innerHTML = str1 + "<br>" + str2;
        gameResult = gameLogic(playChoiceResult, computerChoice)
        console.log(gameResult)
        let outString = "The result: " + gameResult
        document.getElementById("result").innerHTML = "<span class='result'> " + outString + "</span>"
        updateScoreboard(gameResult)
    })
}

function gameLogic(input1, input2){
    let result = null
    switch(input1){
        case "rock":
            //rock
            if (input2 == "rock"){
                    result = "draw"
                } else if(input2 == "paper"){
                    result = "loss"
                } else if(input2 == "scissors"){
                    result = "win"
                }
            break

        case "paper":
            //paper
            if (input2 == "rock"){
                result = "win"
            } else if(input2 == "paper"){
                result = "draw"
            } else if(input2 == "scissors"){
                result = "loss"
            }
            break

        case "scissors":
            //scissors
            if (input2 == "rock"){
                result = "loss"
            } else if(input2 == "paper"){
                result = "win"
            } else if(input2 == "scissors"){
                result = "draw"
            }
            break
        }
    
    return result.toUpperCase()

}

function updateScoreboard(result){
    let playerScore = 0 
    if (result == "WIN")
        playerScore++
    document.getElementById('playerScore').innerText = "Player Score: " + playerScore
}

game()