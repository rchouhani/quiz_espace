import { quiz_espace } from "./spaceQuestions.js"; // Import des questions

/* VARIABLES CONTAINERS */
// Paragraphe intro
const newParagraph = document.querySelector("#intro");
newParagraph.innerText = quiz_espace.intro;

// quiz-container
const quizContainer = document.querySelector("#quiz-container");
quizContainer.style.margin = "20px 50px";

// questions
const questionTexte = document.querySelector("#question-text");

// options
const choixOptions = document.querySelector("#options-container");
questionTexte.appendChild(newParagraph);

// compteur temps
const paragraphTimer = document.querySelector('#warningTimer')

// COMPTEURS
let textIndex = 0; 
let scoreIndex = 0;
let t = 0;
let myTimeout; 

// score correct answer
const scoreBonnesReponses = document.querySelector("#score-correct-answer")
// message au joueur en fonction de son score
const message = document.querySelector("#messageJoueur")


/* VARIABLES BOUTONS 🅱️ */
// bouton "Let's go!"
const boutonStart = document.querySelector("#start-button");
// bouton "Suivant"
const boutonSuivant = document.querySelector("#next-button");
// bouton "Rejouer"
const boutonRejouer = document.querySelector("#replay-button");

// Sélectionne tous les boutons, mais uniquement pour que le Timer les désactive arrivé au bout du temps imparti
let allButtonsForTimer;
// Bouton suivant uniquement pour le timer
const boutonSuivantTimer = document.querySelector("#next-button");

/* VARIABLES PROGRESS BAR 🚀 */
let progressTimer = document.querySelector("#progress-bar")
const progressBarTimer = document.querySelector("#progress-bar")
const containerProgressBarTimer = document.querySelector("#progress-bar-container")
let totalQuestionsTimer = quiz_espace.questions.length; // Nombre total de questions (ici : 6)

const progressBar = document.querySelector("#progress-bar");
const containerProgressBar = document.querySelector("#progress-bar-container");
const totalQuestions = quiz_espace.questions.length; // Nombre total de questions (ici : 6)
// const fuseeProgressBar = document.querySelector("progressFusee");


// ************************************************************************************** //


// affichage de la PREMIERE QUESTION & de ses OPTIONS
boutonStart.addEventListener("click", function () {

    // Changer le fond d'écran
    document.body.classList.remove("initial-background");
    document.body.classList.add("quiz-background");

    // questions
    const askedQuestion = document.querySelector("#question-text");
    askedQuestion.innerText = quiz_espace.questions[textIndex].text;

    // Pour chaque option, créer un bouton et l'ajouter au conteneur (A VOIR POUR METTRE DANS UN AUTRE FICHIER)
    quiz_espace.questions[textIndex].options.forEach((option) => {

    const boutonOptions = document.createElement("button");
    boutonOptions.id = option; // AJOUTER id pour identifier de façon unique le bouton sur lequel l'utilisateur à cliqué
    boutonOptions.innerText = option;
    boutonOptions.classList.add("boutonOptionsCSS"); // on ajoute la classe "boutonOptionsCSS" à tous les boutons "option"
    choixOptions.appendChild(boutonOptions);

    });

    askedQuestion.style.backgroundColor = "rgba(8, 84, 159, 0.5)"
    askedQuestion.style.borderBottom = "7px double #bae705"
    askedQuestion.style.borderRadius = "0 15px 0 15px"
    askedQuestion.style.boxShadow = "10px 10px 25px rgb(8, 115, 229)"
    // askedQuestion.classList.add("question-text")
    boutonStart.classList.add("hidden");
  
    paragraphTimer.classList.remove("hidden")

    allButtonsForTimer = choixOptions.querySelectorAll("button"); // Initialiser ici
    myTimeout = setInterval(() => warningTime(allButtonsForTimer), 1000); // Passer allButtonsForTimer
  
    boutonSuivant.classList.remove("hidden"); // faire apparaitre le bouton "suivant"
});


// FONCTION LOAD NEXT QUESTION
  // affichage des questions suivantes au clic du bouton "Suivant" (code copié de bouton start)
boutonSuivant.addEventListener("click", function () {
    clearInterval(myTimeout)

    choixOptions.innerHTML = "";
    textIndex++
  
      // Vérifier si c'est la dernière question
      if (textIndex >= quiz_espace.questions.length) {
        // Cacher le bouton "Suivant" et afficher le bouton "Rejouer"
        boutonSuivant.classList.add("hidden");
        scoreBonnesReponses.classList.remove("hidden");
        scoreBonnesReponses.innerText = ("Bonnes réponses : " + scoreIndex + " / " + quiz_espace.questions.length);
        message.classList.remove("hidden")
        boutonRejouer.classList.remove("hidden");
        paragraphTimer.classList.add("hidden");
        questionTexte.innerHTML = "";
  
        questionTexte.style.backgroundColor = "";
        questionTexte.style.borderRadius = "";
        questionTexte.style.borderBottom = "";
        questionTexte.style.boxShadow = "";
  
         // Changer le fond d'écran
         document.body.classList.remove("quiz-background");
         document.body.classList.add("replay-background");
      }
      
    const askedQuestion = document.querySelector("#question-text");
    askedQuestion.innerText = quiz_espace.questions[textIndex].text;
  
    // Pour chaque option, créer un bouton et l'ajouter au conteneur
    quiz_espace.questions[textIndex].options.forEach((option) => {
      const boutonOptions = document.createElement("button");
      boutonOptions.id = option; // AJOUTER id pour identifier de façon unique le bouton sur lequel l'utilisateur à cliqué
      boutonOptions.innerText = option;
      boutonOptions.classList.add("boutonOptionsCSS"); // on ajoute la classe "boutonOptionsCSS" à tous les boutons "option"
      choixOptions.appendChild(boutonOptions);

    });
    
    boutonStart.classList.add("hidden");
    boutonSuivant.classList.remove("hidden"); // faire apparaitre le bouton "suivant"
    boutonSuivant.setAttribute("disabled", "") // rend inactif le bouton suivant tant que l'on n'a pas donné de réponse
    t = 0
    myTimeout = setInterval(() => warningTime(allButtonsForTimer), 1000); // Passer allButtonsForTimer
    allButtonsForTimer = choixOptions.querySelectorAll("button")
});


// RECUPERATION DE L'OPTION CLIQUEE
choixOptions.addEventListener("click", function (event) {
    const buttonClicked = event.target; // récupère l'élément bouton cliqué
    const buttonIdClicked = event.target.id; // Recuperer l'ID du bouton sur lequel l'utilisateur a cliqué
    const correctAnswer = quiz_espace.questions[textIndex].correct_answer; // Recuperer la réponse considerée comme correct depuis quiz_space

    checkAnswer(buttonIdClicked, correctAnswer, buttonClicked);

    //bouton "Suivant" DISABLED
    boutonSuivant.removeAttribute("disabled")

    // PROGRESS BAR 🚀
    containerProgressBar.classList.remove("hidden");  // faire apparaitre le container de la progress bar
    progressBar.classList.remove("hidden");  // faire apparaitre la progress bar

   // Mettre à jour la barre de progression
    const progress = ((textIndex + 1) / totalQuestions) * 100;
    progressBar.style.width = progress + "%";
    // console.log("image fusee progress bar : ", fuseeProgressBar)
    // fuseeProgressBar.classList.remove("hidden");
});


// Calcul score bonnes réponses
function correctAnswerScore(buttonIdClicked, correctAnswer){
  if(buttonIdClicked === correctAnswer){
    scoreIndex++;
  };

  if(scoreIndex <= 2){
    message.innerText = "L'espace, c'est pas ton truc... 🥱"
  }else if(scoreIndex >= 4 && scoreIndex <= 7){
    message.innerText = "Pas mal, persévère ! 🤩"
  }else if (scoreIndex >= 8 && scoreIndex <= 9){
    message.innerText = "Excellent ! tu es prêt pour la prochaine expédition sur Mars !! 🥳"
  }else{
    message.innerText = "BRAVO ! Tu es prêt pour coloniser la Lune !! 🎉 🥳"
  }
};


/* Gestion réponses */
function checkAnswer(buttonIdClicked, correctAnswer, buttonClicked) {
    correctAnswerScore(buttonIdClicked, correctAnswer);

      if (buttonIdClicked === correctAnswer) {
        buttonClicked.style = "border: 6px solid #90EE90"
      } else {
        buttonClicked.style = "border: 6px solid #DC143C"
        // j'affiche quelle était la réponse correcte
      const allButtons = choixOptions.querySelectorAll("button");
          allButtons.forEach(button => {
            // Une fois une option cliquée, on désactive les autres boutons options
          button.disabled = true;
             // Une fois une option cliquée, on fait apparaitre la bonne réponse
          if (button.id === correctAnswer) {
                  button.style.border = "6px solid #90EE90";
          }
        }); 
      }
}


function warningTime(allButtonsForTimer) {
  const correctAnswerTimer = quiz_espace.questions[textIndex].correct_answer;
  t++
  paragraphTimer.innerHTML = t
    if(t > 20){
      paragraphTimer.innerHTML = "trop tard"
      clearInterval(myTimeout);
      boutonSuivantTimer.disabled = false; // Uniquement lorsque le timer est terminé
      containerProgressBarTimer.classList.remove("hidden");  // faire apparaitre le container de la progress bar lorsque le timer est terminé
      progressBarTimer.classList.remove("hidden");  // faire apparaitre la progress bar lorsque le timer est terminé
      progressTimer = ((textIndex + 1) / totalQuestionsTimer) * 100 // Uniquement lorsque le timer est terminé
      progressBarTimer.style.width = progressTimer + "%" // Uniquement lorsque le timer est terminé

      allButtonsForTimer.forEach(button => {
          button.disabled = true;
        if (button.id === correctAnswerTimer) {
            button.style.border = "6px solid #90EE90";
        }
      });
    }
}

// Gestion du bouton "Rejouer"
  boutonRejouer.addEventListener("click", function () {
    location.reload(); // Rafraîchir la page
  });