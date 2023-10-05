document.addEventListener("DOMContentLoaded", function () {
    const choices = ["rock", "paper", "scissors"];
    const gameResult = document.getElementById("result");

    function computerChoice() {
        const index = Math.floor(Math.random() * choices.length);
        return choices[index];
    }

    function determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return "You tied!".toUpperCase();
        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {
            return "You win!".toUpperCase();
        } else {
            return "You lost!".toUpperCase();
        }
    }

    function hideThirdChoice(selectedChoice, computerChoice) {

        choices.forEach(choice => {
            if (choice !== selectedChoice && choice !== computerChoice) {
                document.getElementById(choice).style.display = "none";
            }
        });

        
        if (choices.indexOf(selectedChoice) > choices.indexOf(computerChoice)) {
            const container = document.querySelector(".container-for-images");
            const children = Array.from(container.children);
            children.reverse();
            children.forEach(child => container.appendChild(child));
        }
    }

    function play(playerChoice) {
        const computer = computerChoice();
        const result = determineWinner(playerChoice, computer);
        const playerDiv = document.getElementById(playerChoice);
        const computerDiv = document.getElementById(computer);

        playerDiv.querySelector("p").style.display = "none";
        computerDiv.querySelector("p").style.display = "none";

        const computerImage = computerDiv.querySelector("img");
        if (result !== "You tied!".toUpperCase()) {
            computerImage.classList.add("flip-image");
        } else {
            
            const clone = document.getElementById(playerChoice).cloneNode(true);
            clone.classList.add("flip-image");
            document.getElementById(playerChoice).after(clone);
        }
        hideThirdChoice(playerChoice, computer);

        gameResult.textContent = result;
        stopGame();
    }

    function stopGame(){
        rockButton.removeEventListener("click", rockButtonClickHandler);
        paperButton.removeEventListener("click", paperButtonClickHandler);
        scissorsButton.removeEventListener("click", scissorsButtonClickHandler);
    }

    function rockButtonClickHandler() {
        play("rock");
    }

    function paperButtonClickHandler() {
        play("paper");
    }

    function scissorsButtonClickHandler() {
        play("scissors");
    }

    function replay() {
        window.location.reload();
    }

    const rockButton = document.getElementById("rock");
    const paperButton = document.getElementById("paper");
    const scissorsButton = document.getElementById("scissors");
    const replayButton = document.getElementById("btn");


    rockButton.addEventListener("click", rockButtonClickHandler);
    paperButton.addEventListener("click", paperButtonClickHandler);
    scissorsButton.addEventListener("click", scissorsButtonClickHandler);
    replayButton.addEventListener("click", replay);
});