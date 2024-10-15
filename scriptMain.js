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

const newRollButton = document.getElementById('newRoll');

const reRollButton = document.getElementById('reRoll');

const selectImage = document.getElementById

newRollButton.addEventListener('click', getDice);

reRollButton.addEventListener('click', reRoll);

// yatzy javascript

let rollValue;

let kindValue1;

let kindValue2;



// loop throgh each dice and add


// dice roll

function getDiceNumber() {
    return Math.floor(Math.random() * 6) + 1;
} // Math.random gives a number that is greater >= 0 and < 1. Multiply by 6 and add 1 gives you 1-6 because it can't be 1

// switch 

// function getDiceImage(diceRoll) {
    
//     console.log(`Generating image for dice number: ${diceRoll}`);

//     switch (diceRoll) {
//         case 1:
//             return 'Side1.png' + console.log(`Image retrieved for ${diceRoll}`);
//             break;
//         case 2:
//             return 'Side2.png';
//             break;
//         case 3:
//             return 'Side3.png';
//             break;
//         case 4:
//             return 'Side4.png';
//             break;
//         case 5:
//             return'Side5.png';
//             break;
//         case 6:
//             return'Side6.png';
//             break;
//         default:
//             console.log('Invalid dice roll');
//             return '';
//     }
// }



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
}



// does a new full roll

