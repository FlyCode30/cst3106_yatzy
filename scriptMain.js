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

scoreButton.addEventListener('click', scoreClear)

let counter = 0;

let scoreTotalTop = 0;
let scoreTotalBot = 0;

// this array holkds the dice choosen by the user
let fullRoll = [];
let countTotal = [0,0,0,0,0,0];



// get array to calculate scores

function getCountTotalArray() {

    // this array is used to count the values
    //let countTotal = [0, 0, 0, 0, 0, 0];


    for (let i = 0; i < fullRoll.length; i++) {
        if (fullRoll[i] === 1) {
            countTotal[0] += 1;
        } else if (fullRoll[i] === 2) {
            countTotal[1] += 1;
        } else if (fullRoll[i] === 3) {
            countTotal[2] += 1;
        } else if (fullRoll[i] === 4) {
            countTotal[3] += 1;
        } else if (fullRoll[i] === 5) {
            countTotal[4] += 1;
        } else if (fullRoll[i] === 6) {
            countTotal[5] += 1;
        }
    }

}

    // gets the score for the top
function arrayScoreCounterTop() {

    getCountTotalArray();

    for (let i = 0; i < countTotal.length; i++) {

        if (countTotal[i] > 0) {
            let topScoreField = document.getElementById(`g1-${i + 1}`);
            let scoreValue = countTotal[i] * (i + 1);
            topScoreField.placeholder = scoreValue;
        }
    }

}

// calculate the variable that appears the most for a given roll

function calculateMaxCount() {
    maxCount = Math.max(...countTotal);
}

    // getting the value of kinds, yahtee, full house 
function arrayScoreCounterBot() {

    let botSum;
    //let botScoreValue;
    let botScoreFieldYah;
    let botScoreFieldSum;
    let botScoreFieldFH;
    let has3k = false;
    let has2k = false;
    let ss = false;

    calculateMaxCount();

    // checks for a small straight

    isLargeStraight();
    isSmallStraight();


    // checks for a full house

    for (let i = 0; i < countTotal.length; i++) {
        if (countTotal[i] === 3) {
            has3k = true;
        } else if (countTotal[i] === 2) {
            has2k = true;
        }
    }

    if (has3k && has2k) {
        botScoreFieldFH = document.getElementById('g1-fh')
        botScoreFieldFH.placeholder = 25;
    }

    // checks for yahztee, kinds, and chances

    if (maxCount === 5) {
        botScoreFieldYah = document.getElementById(`g1-yah`);
        botScoreFieldYah.placeholder += 50;
        botScoreFieldSum = document.querySelectorAll('#g1-3k, #g1-4k, #g1-chance');
        botSum = fullRoll.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        botScoreFieldSum.forEach (field => {
            field.placeholder = botSum;
        })
    } else if (maxCount === 4) {
        botScoreFieldSum = document.querySelectorAll('#g1-3k, #g1-4k, #g1-chance');
        botSum = fullRoll.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        botScoreFieldSum.forEach (field => {
            field.placeholder = botSum;
        })
    } else if (maxCount === 3 ) {
        botScoreFieldSum = document.querySelectorAll('#g1-3k, #g1-chance');
        botSum = fullRoll.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        botScoreFieldSum.forEach (field => {
            field.placeholder = botSum;
        })
    } 

    console.log("Count Total: ", countTotal);
    console.log("Highest Count: ", maxCount);
    console.log('has 2k is ', has2k);
    console.log('has 3k is', has3k);
    // console.log('has LS: ', )
}

function isSmallStraight() {

    let botScoreFieldSS = document.getElementById('g1-ss')

    if (countTotal[0] >= 1 && countTotal[1] >= 1 && countTotal[2] >= 1 && countTotal[3] >= 1) {
        botScoreFieldSS.placeholder = 25;
    } else if (countTotal[1] >= 1 && countTotal[2] >= 1 && countTotal[3] >= 1 && countTotal[4] >= 1) {
        botScoreFieldSS.placeholder = 25;
    } else if (countTotal[2] >= 1 && countTotal[3] >= 1 && countTotal[4] >= 1 && countTotal[5] >= 1) {
        botScoreFieldSS.placeholder = 25;
    }

}

function isLargeStraight() {

    calculateMaxCount();
    let botScoreFieldLS = document.getElementById('g1-ls')

    if (maxCount === 1 && (countTotal[0] === 0 || countTotal[5] === 0)) {
        console.log("You got a large straight");
        botScoreFieldLS.placeholder = 30;
    } else {
        console.log("No larges straight");1
    }
}

// function calculateBonusTop {

//     let topSubTop = document.getElementById('subTot-up-g1');
//     let topBonusTop = document.getElementById('bonus-up-g1');
//     let topTotalTop = document.getElementById('tot-up-g1');

//     botScoreFieldSum = document.querySelectorAll('#g1-3k, #g1-4k, #g1-chance');
//     botScoreFieldSum.forEach (field => {
//         field.placeholder = botSum;
//     })    
// }

// scores and rerolls

function scoreClear() {

    clearChoiceDice();
    clearPlaceHolder(); // clears placeholders from the roll
    counter = 0; // resets counter to 0
    //has2k = false; // resets for full house
    //has3k = false; // resets for full house
    getDice();
 

    console.log('Counter is: ', counter);
}

// primary function to control changes for each roll. 

function controlButtons() {

    if (counter === 0) {
        document.getElementById('reRoll').disabled = true;
        document.getElementById('score').disabled = true;
    } else if (counter === 1) {
        document.getElementById('newRoll').disabled = true;
        document.getElementById('reRoll').disabled = false;
        document.getElementById('score').disabled = true;
    } else if (counter === 2) {
        document.getElementById('score').disabled = true;
    } else if (counter === 3) {
        document.getElementById('newRoll').disabled = true;
        document.getElementById('reRoll').disabled = true;
        document.getElementById('score').disabled = false;
        clearRollDice(); /* added */
        getFullRoll();
        arrayScoreCounterTop();
        arrayScoreCounterBot();
    } else {
        console.log("Counter has been reset");
    }
}

// gets the number for the dice roll

function getDiceNumber() {
    return Math.floor(Math.random() * 6) + 1;
} // Math.random gives a number that is greater >= 0 and < 1. Multiply by 6 and add 1 gives you 1-6 because it can't be 1

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
    //console.log(counter);
    //console.log(document.getElementById('newRoll').disabled);
}

// roles the dice again after the initial roll

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
    //console.log(counter);
    //console.log(document.getElementById('newRoll').disabled);
}

// allows player to select a dice and move it to the scoring area

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

// retrieves dice at the end of a turn and places the values in an array

function getFullRoll() {

    let value;

    for (let i = 1; i <= 5; i++) {
        const diceContainer = document.getElementById(`choice${i}`); // get the container that contains the dice

        const imgPath = diceContainer.src.split('/').pop(); // extract image name from source path

        value = getCountVale(imgPath);

        // console.log(value);

        if (!(value === 0 || diceContainer.style.display === "none")) {
            fullRoll.push(value)
        }
    }

    console.log('Full Roll is: ',fullRoll);
    return fullRoll;
}

// used to get the correct image based on the value created by the random number generator

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

// clears any dice in the score area and replaces with empty dice image. Also resets fullFull and count Totals

function clearChoiceDice() {

    for (let i = 1; i <= 5; i++) {
        const diceContainer = document.getElementById(`choice${i}`);

        diceContainer.src = "side0.png"
    }

    fullRoll = [];
    countTotal = [0,0,0,0,0,0]
}

// clears dice in the roll area and moves them to the scoring area

function clearRollDice() {

    for (let i = 1; i <= 5; i++) {
        const rolledDice = document.getElementById(`dice${i}`);
        const choiceDice = document.getElementById(`choice${i}`);

        if (rolledDice.style.display === "flex") {
            const imgPath = rolledDice.src
            choiceDice.src = imgPath;
            rolledDice.src = "side0.png"
        }
    }
}

// clears placeholder after each turn

function clearPlaceHolder() {

    const placeHolderInput = document.querySelectorAll('input[name="g1"]');

    placeHolderInput.forEach(field => {
        
        if (!field.value) {
            field.placeholder = "";
        }
    })
}