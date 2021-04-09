// Merci Yann 😊
// TODO : les tests !!!

const chalk = require("chalk");
const readlineSync = require("readline-sync");
const fs = require("fs");
const { randomInt } = require("crypto");

console.log(
  chalk.blue.bold("🚪÷÷🐐÷÷🚗÷÷🚪÷÷🐐÷÷🚗÷÷🚪÷÷🐐÷÷🚗÷÷ THE MONTY HALL GAME ÷÷🐐÷÷🚗÷÷🚪÷÷🐐÷÷🚗÷÷🚪÷÷🐐÷÷🚗÷÷🚪")
);
console.log("");
console.log("");

let gamesPlayed = 0;

do {
  let userFirstName = readlineSync.question(chalk.green("Hello, may I have your first name ? : "));
  console.log(chalk.green(`Welcome to THE MONTY HALL GAME ${userFirstName}  ↩`));

  console.log("");

  console.log(
    chalk.yellow(`You have to choose a door among the three. One door hides a car 🚗. The other two, a goat. 🐐🐐`)
  );
  console.log("");
  console.log(
    chalk.yellow(`If you want to quit the game, enter 0 and to continue just do your choice below ${userFirstName}.`)
  );

  console.log("");
  console.log(chalk.red.bold("÷÷÷÷÷÷÷÷"));

  let randomCarIndex = randomInt(0, 3); // Index de la voiture
  const possibleChoices = ["DOOR 🚪1", "DOOR 🚪2", "DOOR 🚪3"];
  console.log("");

  let userChoice = readlineSync.keyInSelect(possibleChoices); // Choix de l'utilisateur (index)
  console.log("");

  console.log(chalk.red.bold("÷÷÷÷÷÷÷÷"));

  if (userChoice === -1) {
    process.exit();
  }

  // Création du choix alternatif
  const indexToKeep = [];
  indexToKeep.push(randomCarIndex, userChoice);
  //indexToKeep.push();
  const indexToKeepNoRepeat = [...new Set(indexToKeep)];
  const indexToKeepNoRepeatSorted = indexToKeepNoRepeat.sort((a, b) => a - b);

  let gateToDiscard = undefined;
  let altGateToDisplay = undefined;

  if (indexToKeepNoRepeatSorted.length === 2) {
    for (let i = 0; i < 3; i++) {
      if (i !== randomCarIndex && i !== userChoice) {
        gateToDiscard = i;
        altGateToDisplay = randomCarIndex;
      }
    }
  } else {
    for (let i = 0; i < 3; i++) {
      if (i !== userChoice) {
        altGateToDisplay = i;
        break;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (userChoice !== i && altGateToDisplay !== i) {
        gateToDiscard = i;
        break;
      }
    }
  }

  console.log("");
  // Possibilité pour l'utilisateur de changer de porte
  // TODO : Peut-être montrer ce qu'il y a derrière la porte
  console.log(
    chalk.yellow(
      `We removed the ${possibleChoices[gateToDiscard]}. You have the option to keep your ${possibleChoices[userChoice]} or to choose the ${possibleChoices[altGateToDisplay]}`
    )
  );
  console.log("");
  const finalChoice = readlineSync.keyInYN(chalk.yellow("Do you want to change the door?"));
  console.log("");

  let finalUserChoice = userChoice;

  if (finalChoice) {
    finalUserChoice = altGateToDisplay;
  }

  // Victoire ou Défaite
  if (finalUserChoice === randomCarIndex) {
    console.log(chalk.green.bold(`Congratulations ${userFirstName}, you won a car ✨🚗✨!`));
    const playAgain = ["Do you want to play a new game?"];
    console.log("");
    const exitGame = readlineSync.keyInSelect(playAgain);
    if (exitGame === -1) {
      process.exit();
    }
  } else {
    console.log(chalk.red.bold(`Sorry ${userFirstName}, no car behind that door. You lost 🥺 !`));
    const playAgain = ["Do you want to start a new game ?"];
    console.log("");
    const exitGame = readlineSync.keyInSelect(playAgain);
    if (exitGame === -1) {
      process.exit();
    }
  }

  gamesPlayed++;
} while (gamesPlayed <= 1000);
process.exit();
