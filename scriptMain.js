// load scoreboard

function loadScoreBoard(page) {
    fetch(page)
        .then(Response => Response.text())
        .then(data => {
            const scoreBoard = document.getElementById('scoreTable');
            scoreBoard.innerHTML = data;
            scoreBoard.classList.add('show');
        })
}

window.onload = function () {
    loadScoreBoard('scoreAreaYatzy.html');
}

// constants

const selectImage = document.getElementById

const newRollButton = document.getElementById('newRoll');

const reRollButton = document.getElementById('reRoll');

const scoreButton = document.getElementById('score');

newRollButton.addEventListener('click', getDice);

reRollButton.addEventListener('click', reRoll);

//scoreButton.addEventListener('click', getCountValuesAll);

// yatzy javascript

let counter = 0;

const fullRoll = [];

console.log(fullRoll);


// get values for all the dice

function getFullRoll() {

    let value;

    for (let i = 1; i <= 5; i++) {
        const diceContainer = document.getElementById(`choice${i}`); // get the container that contains the dice

        const imgPath = diceContainer.src.split('/').pop(); // extract image name from source path

        value = getCountVale(imgPath);

        // console.log(value);

        if (value) {
            fullRoll.push(value)
        }
    }

    for (let i = 1; i <= 5; i++) {
        const diceContainer = document.getElementById(`dice${i}`); // get the container that contains the dice

        const imgPath = diceContainer.src.split('/').pop(); // extract image name from source path

        value = getCountVale(imgPath);

        // console.log(value);

        if (value) {
            fullRoll.push(value)
        }
    }

    console.log(fullRoll);
    return fullRoll;
}

// function to change counter


// 

function controlButtons() {
 
    if (counter === 0) {
        document.getElementById('reRoll').disabled = true;
        document.getElementById('score').disabled = true;
    } else if (counter === 1) {
        document.getElementById('newRoll').disabled = true;
        document.getElementById('score').disabled = true;
    } else if (counter === 2) {
        document.getElementById('score').disabled = true;
    } else if (counter === 3) {
        document.getElementById('newRoll').disabled = true;
        document.getElementById('reRoll').disabled = true;
        document.getElementById('score').disabled = false;
        getFullRoll();
    } else {
        console.log("Counter has been reset");
    }
}



// dice roll

function getDiceNumber() {
    return Math.floor(Math.random() * 6) + 1;
} // Math.random gives a number that is greater >= 0 and < 1. Multiply by 6 and add 1 gives you 1-6 because it can't be 1

// switch 

function getCountVale(diceRoll) {

    console.log(`Generating image for dice number: ${diceRoll}`);

    switch (diceRoll) {
        case 'side0.png':
            return 0
            break;
        case 'side1.png':
            return 1
            break;
        case 'side2.png':
            return 2;
            break;
        case 'side3.png':
            return 3;
            break;
        case 'side4.png':
            return 4;
            break;
        case 'side5.png':
            return 5;
            break;
        case 'side6.png':
            return 6;
            break;
        default:
            console.log('Invalid dice roll');
            return '';
    }
}


 // conneted to NewRoll button. Does a fresh new roll
function getDice() {

    clearChoiceDice();

    for (let i = 1; i <= 5; i++) {
        const diceContainer = document.getElementById(`dice${i}`); // get the container that holds the image
        console.log(`Dice container for roll ${i}`, diceContainer);

        diceContainer.style.display = "flex"; // make visible by making the images flex

        const diceNumber = getDiceNumber(); // get a random number
        console.log(`Dice ${i} rolled: ${diceNumber}`);

        const imgPath = `side${diceNumber}.png`;
        console.log(`Generated image path: ${imgPath}`);

        diceContainer.src = imgPath;
    }

    counter++;
    controlButtons();
    console.log(counter);
    console.log(document.getElementById('newRoll').disabled);
    // clears the 


}

function clearChoiceDice() {

    for (let i = 1; i <= 5; i++) {
        const diceContainer = document.getElementById(`choice${i}`);

        diceContainer.src = "side0.png"
    }

}

function selectDiceClick(diceNumber) {

    const clickedDice = document.getElementById(`dice${diceNumber}`);
    const choiceDice = document.getElementById(`choice${diceNumber}`);

    if (clickedDice.style.display === "none") {
        clickedDice.style.display = "flex";
    } else {
        clickedDice.style.display = "none";

        const imgPath = clickedDice.src // I think this is mostly right. The part of i'm not sure about is I want to get the same image path of the clickedDice

        choiceDice.src = imgPath;
    }
}


function reRoll() {

    // rolls new dice for all 5 dice in the roll area
    for (let i = 1; i <= 5; i++) {
        let diceContainer = document.getElementById(`dice${i}`); // get the container that holds the image
        console.log(`Dice container for roll ${i}`, diceContainer);

        if (diceContainer.style.display === "flex") {
            const diceNumber = getDiceNumber(); // get a random number
            console.log(`Dice ${i} rolled: ${diceNumber}`);

            const imgPath = `side${diceNumber}.png`;
            console.log(`Generated image path: ${imgPath}`);

            diceContainer.src = imgPath;
        }
    }

    counter++;
    controlButtons();
    console.log(counter);
    console.log(document.getElementById('newRoll').disabled);
}



// does a new full roll

