import { quiz_espace } from "./questions.js"; // Import des questions

// Paragraphe intro
const newParagraph = document.querySelector("#intro");
console.log("paragraphe intro");
newParagraph.innerText = quiz_espace.intro;

// quiz-container
const quizContainer = document.querySelector("#quiz-container");
quizContainer.style.margin = "20px 50px";

// questions
const questionTexte = document.querySelector("#question-text");
console.log("première question");

// options
const choixOptions = document.querySelector("#options-container");

questionTexte.appendChild(newParagraph);

// COMPTEURS
let textIndex = 0; 
let scoreIndex = 0;

// score correct answer
const scoreBonnesReponses = document.querySelector("#score-correct-answer")
const message = document.querySelector('#messageJoueur')

// BOUTONS //
// bouton "Let's go!"
const boutonStart = document.querySelector("#start-button");
// bouton "Suivant"
const boutonSuivant = document.querySelector("#next-button");
console.log(boutonSuivant);
// bouton "Rejouer"
const boutonRejouer = document.querySelector("#replay-button");


// affichage de la première question & de ses options
boutonStart.addEventListener("click", function () {
  const askedQuestion = document.querySelector("#question-text");
  askedQuestion.innerText = quiz_espace.questions[textIndex].text;
  console.log("options", quiz_espace.questions[textIndex].options);

  // Pour chaque option, créer un bouton et l'ajouter au conteneur
  quiz_espace.questions[textIndex].options.forEach((option) => {
    console.log(option);
    const boutonOptions = document.createElement("button");
    boutonOptions.id = option; // AJOUTER id pour identifier de façon unique le bouton sur lequel l'utilisateur à cliqué
    boutonOptions.innerText = option;
    boutonOptions.classList.add("boutonOptionsCSS"); // on ajoute la classe "boutonOptionsCSS" à tous les boutons "option"
    choixOptions.appendChild(boutonOptions);
    // return;
  });
  boutonStart.classList.add("hidden");
  boutonSuivant.classList.remove("hidden"); // faire apparaitre le bouton "suivant"
});


choixOptions.addEventListener("click", function (event) {
    const buttonClicked = event.target; // recupere l'élément bouton cliqué
    const buttonIdClicked = event.target.id; // Recuperer l'ID du bouton sur lequel l'utilisateur a cliqué
    const correctAnswer = quiz_espace.questions[textIndex].correct_answer; // Recuperer la réponse considerée comme correct depuis quiz_space

    console.log("id du bouton cliqué : " + buttonIdClicked);
    //console.log("id du boutton sur lequel l'utilisateur a cliqué : " + event.target.id); // afficher dans la console l'id du bouton
   
   
    checkAnswer(buttonIdClicked, correctAnswer, buttonClicked);
    //bouton "Suivant" DISABLED
    boutonSuivant.removeAttribute("disabled")
    return
});

// Calcul score bonnes réponses
function correctAnswerScore(buttonIdClicked, correctAnswer){
  if(buttonIdClicked === correctAnswer){
    scoreIndex++;
  };

  if(scoreIndex <= 2){
    message.innerText = "waouh t'es nul !!!!!"
  }
  
  if(scoreIndex > 3){
    message.innerText = "Waouh tes doué!!!§§§§"
  }
};

/* Gestion réponses */

function checkAnswer(buttonIdClicked, correctAnswer, buttonClicked) {
    console.log("buttonClicked :" + buttonClicked);
    console.log("buttonIdClicked :" + buttonIdClicked);
    console.log("correctAnswer :" + correctAnswer);
    correctAnswerScore(buttonIdClicked, correctAnswer);
    
   
      if (buttonIdClicked === correctAnswer) {
        buttonClicked.style = "border: 4px solid green"
        console.log("🦄 gagné !", correctAnswer);
        console.log("nombre de bonnes réponses :", scoreIndex);

      } else {
        console.log("🐸 perdu !");
        buttonClicked.style = "border: 4px solid red"
        // j'affiche quelle était la réponse correcte
        const allButtons = choixOptions.querySelectorAll("button");
          allButtons.forEach(button => {
              if (button.id === correctAnswer) {
                  button.style.border = "6px solid green";
              }
        }); 
      }
      // Une fois une option cliquée, on désactive les autres boutons options
      const allButtons = choixOptions.querySelectorAll("button");
      allButtons.forEach(button =>{
        button.disabled = true;
      })

}
 

// FONCTION LOAD NEXT QUESTION
  // affichage des questions suivantes au clic du bouton "Suivant" (code copié de bouton start)
  boutonSuivant.addEventListener("click", function () {
  choixOptions.innerHTML = "";
  textIndex++

    // Vérifier si c'est la dernière question
    if (textIndex >= quiz_espace.questions.length) {
      // Cacher le bouton "Suivant" et afficher le bouton "Rejouer"
      boutonSuivant.classList.add("hidden");
      scoreBonnesReponses.classList.remove("hidden");
      scoreBonnesReponses.innerText = ("Nombre de bonnes réponses : " + scoreIndex + " / " + quiz_espace.questions.length);
      message.classList.remove("hidden")
      boutonRejouer.classList.remove("hidden");
      questionTexte.innerHTML = "";
    }
    
  const askedQuestion = document.querySelector("#question-text");
  askedQuestion.innerText = quiz_espace.questions[textIndex].text;

  // Pour chaque option, créer un bouton et l'ajouter au conteneur
  quiz_espace.questions[textIndex].options.forEach((option) => {
    console.log(option);
    const boutonOptions = document.createElement("button");
    boutonOptions.id = option; // AJOUTER id pour identifier de façon unique le bouton sur lequel l'utilisateur à cliqué
    boutonOptions.innerText = option;
    boutonOptions.classList.add("boutonOptionsCSS"); // on ajoute la classe "boutonOptionsCSS" à tous les boutons "option"
    choixOptions.appendChild(boutonOptions);
  });
  boutonStart.classList.add("hidden");
  boutonSuivant.classList.remove("hidden"); // faire apparaitre le bouton "suivant"
  boutonSuivant.setAttribute("disabled", "") // rend inactif le bouton suivant tant que l'on n'a pas donné de réponse
  
});

// Gestion du bouton "Rejouer"
  boutonRejouer.addEventListener("click", function () {
    location.reload(); // Rafraîchir la page
  });