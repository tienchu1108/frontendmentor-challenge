// overlay display

const ruleButton = document.querySelector("#ruleButton");
const overlay = document.querySelector(".rulesOverlay");

ruleButton.addEventListener("click", (event) => {
  overlay.classList.toggle("hidden");
});

const cancelViewingRulesButton = document.querySelector(".cancelViewingRules");
cancelViewingRulesButton.addEventListener("click", (event) => {
  overlay.classList.toggle("hidden");
});

//score display

const scoreDisplay = document.querySelector(".score");

const increaseScore = () => {
  const score = Number.parseInt(scoreDisplay.textContent);
  scoreDisplay.textContent = score + 1;
};

// game states

const GAME_STATES = {
  INTRO: "INTRO",
  OVER: "GAME_OVER",
  WAIT_PLAYER_CHOOSE: "WAIT_PLAYER_CHOOSE",
  PLAYER_CHOSE: "PLAYER_CHOSE",
};

let currentGameState = GAME_STATES.INTRO;

// result congratulation effect

const ripples = document.querySelectorAll(".ripple1, .ripple2, .ripple3");

const playersPickRipples = document.querySelectorAll(
  ".playersPick.ripple1, .playersPick.ripple2, .playersPick.ripple3"
);

const removeRippleOnClasses = () => {
  housesPickRipples.forEach((rippleEl) => {
    rippleEl.classList.remove("rippleOn");
  });
  playersPickRipples.forEach((rippleEl) => {
    rippleEl.classList.remove("rippleOn");
  });
};

const congratPlayer = () => {
  removeRippleOnClasses();
  playersPickRipples.forEach((rippleEl) => {
    rippleEl.classList.add("rippleOn");
  });
};

const housesPickRipples = document.querySelectorAll(
  ".housesPick.ripple1, .housesPick.ripple2, .housesPick.ripple3"
);

const congratHouse = () => {
  removeRippleOnClasses();
  housesPickRipples.forEach((rippleEl) => {
    rippleEl.classList.add("rippleOn");
  });
};

// intro

const gameIntro = document.querySelector(".gameIntro");
const gameInterface = document.querySelector(".gamePlayInterface");
gameIntro.addEventListener("click", (event) => {
  currentGameState = GAME_STATES.WAIT_PLAYER_CHOOSE;
  gameIntro.classList.toggle("hidden");
  gameInterface.classList.toggle("hidden");
});

// wait player

const choiceDisplay = document.querySelector(".choice");
const availableChoicesDisplay = document.querySelectorAll(
  "#Paper, #Rock, #Scissors"
);

const AVAILABLE_CHOICES = {
  ROCK: "ROCK",
  PAPER: "PAPER",
  SCISSORS: "SCISSORS",
};

let playersCurrentChoice = "";
let housesCurrentChoice = "";

choiceDisplay.addEventListener("click", (event) => {
  if (currentGameState === GAME_STATES.WAIT_PLAYER_CHOOSE) {
    availableChoicesDisplay.forEach((choiceToChooseFrom) => {
      choiceToChooseFrom.classList.toggle("hidden");
    });
  }
});

// player has chosen

const hideAvailableChoices = () => {
  availableChoicesDisplay.forEach((el) => {
    el.classList.toggle("hidden");
  });
};

const playersPickImg = document.querySelector("img#playersPick");
const showPick = (choice, displayEl) => {
  const baseSourceUrl = "./images/";
  let finalSource;
  if (choice === AVAILABLE_CHOICES.ROCK)
    finalSource = baseSourceUrl + "Rock.svg";
  if (choice === AVAILABLE_CHOICES.PAPER)
    finalSource = baseSourceUrl + "Paper.svg";
  if (choice === AVAILABLE_CHOICES.SCISSORS)
    finalSource = baseSourceUrl + "Scissors.svg";
  displayEl.setAttribute("src", finalSource);
  displayEl.classList.toggle("hidden");
};

const doesAWinAgainstB = (choiceA, choiceB) => {
  if (choiceA === choiceB) return "DRAW";
  if (choiceA === AVAILABLE_CHOICES.ROCK && choiceB === AVAILABLE_CHOICES.PAPER)
    return "NO";
  else if (
    choiceA === AVAILABLE_CHOICES.PAPER &&
    choiceB === AVAILABLE_CHOICES.SCISSORS
  )
    return "NO";
  else if (
    choiceA === AVAILABLE_CHOICES.SCISSORS &&
    choiceB === AVAILABLE_CHOICES.ROCK
  )
    return "NO";

  // exhausted choices

  return "YES";
};

// displayRoundResult

const roundResultDisplayElement = document.querySelector(".roundResultDisplay");

const displayRoundResult = (result) => {
  roundResultDisplayElement.classList.toggle("hidden");
  if (result === "YES") {
    roundResultDisplayElement.children[0].textContent = "YOU WIN";
  } else if (result === "NO") {
    roundResultDisplayElement.children[0].textContent = "YOU LOSE";
  } else {
    roundResultDisplayElement.children[0].textContent = "DRAW";
  }
};

//resolve result

const resolveResult = () => {
  const isPlayerWin = doesAWinAgainstB(
    playersCurrentChoice,
    housesCurrentChoice
  );
  console.log(playersCurrentChoice);
  console.log(housesCurrentChoice);
  console.log(isPlayerWin);

  if (isPlayerWin === "YES") {
    congratPlayer();
    increaseScore();
  } else if (isPlayerWin === "NO") {
    congratHouse();
  }
  displayRoundResult(isPlayerWin);
};

// house choose

const getHousesChoice = () => {
  const ranInt = Math.ceil(Math.random() * 3);
  if (ranInt === 1) return AVAILABLE_CHOICES.ROCK;
  else if (ranInt === 2) return AVAILABLE_CHOICES.PAPER;
  else if (ranInt === 3) return AVAILABLE_CHOICES.SCISSORS;

  throw new Error("Error in getHousesChoice");
};

const housesPickImg = document.querySelector("#housesPickImg");

const houseChoose = () => {
  const housesChoice = getHousesChoice();
  console.log("house choose", houseChoose);
  housesCurrentChoice = housesChoice;
  showPick(housesChoice, housesPickImg);

  resolveResult();
};

availableChoicesDisplay.forEach((choiceEl) => {
  choiceEl.addEventListener("click", (event) => {
    const type = choiceEl.getAttribute("id").toUpperCase();
    if (type === AVAILABLE_CHOICES.ROCK)
      playersCurrentChoice = AVAILABLE_CHOICES.ROCK;
    if (type === AVAILABLE_CHOICES.SCISSORS)
      playersCurrentChoice = AVAILABLE_CHOICES.SCISSORS;
    if (type === AVAILABLE_CHOICES.PAPER)
      playersCurrentChoice = AVAILABLE_CHOICES.PAPER;

    currentGameState = GAME_STATES.PLAYER_CHOSE;

    hideAvailableChoices();
    showPick(playersCurrentChoice, playersPickImg);

    // house choose

    houseChoose();
  });
});

// play again

const playAgainButton = document.querySelector("button.playAgain");
playAgainButton.addEventListener("click", (event) => {
  roundResultDisplayElement.classList.toggle("hidden");
  playersPickImg.classList.toggle("hidden");
  housesPickImg.classList.toggle("hidden");
  currentGameState = GAME_STATES.WAIT_PLAYER_CHOOSE;
});
