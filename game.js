import { quiz_espace } from "./questions.js"; // Import des questions

// Paragraphe intro
const newParagraph = document.querySelector("#intro");
console.log("paragraphe intro");
newParagraph.innerText = quiz_espace.intro;

// quiz-container
const quizContainer = document.querySelector("#quiz-container");
quizContainer.style.margin = " 20px 50px";

// questions
const quizEspaceElement = document.querySelector("#question-text");
console.log("première question");

// options
const choixOptions = document.querySelector("#options-container");

quizEspaceElement.appendChild(newParagraph);

// bouton "Let's go!"
const boutonStart = document.querySelector("#start-button");
// bouton "Suivant"
const boutonSuivant = document.querySelector("#next-button");
console.log(boutonSuivant);

let correctAnswer = quiz_espace.questions.correct_answer

let textIndex = 0;
// let optionsIndex = 0;

// affichage de la première question & de ses options
boutonStart.addEventListener("click", function () {
  const firstQuestion = document.querySelector("#question-text");
  firstQuestion.innerText = quiz_espace.questions[textIndex].text;
  console.log("options", quiz_espace.questions[textIndex].options);


  // Pour chaque option, créer un bouton et l'ajouter au conteneur
  quiz_espace.questions[textIndex].options.forEach((option) => {
    console.log(option);
    const boutonOptions = document.createElement("button");
    boutonOptions.innerText = option;
    boutonOptions.classList.add("boutonOptionsCSS"); // on ajoute la classe "boutonOptionsCSS" à tous les boutons "option"

    choixOptions.appendChild(boutonOptions);
    return boutonOptions;
    //addEventListener pour enregistrer la valeur checker
  });
  boutonStart.classList.add("hidden");
  boutonSuivant.classList.remove("hidden"); // faire apparaitre le bouton "suivant"
});


choixOptions.addEventListener("click", function () {
  checkAnswer(choixOptions, correctAnswer);
});

/* Gestion réponses */

function checkAnswer(choixOptions, correctAnswer) {
    if (choixOptions === correctAnswer) {
      console.log("🐸 gagné !", correctAnswer);
      choixOptions.classList.add(".right");
    } else {
      console.log("🐸 perdu !");
      choixOptions.classList.add(".wrong");
    }
  }