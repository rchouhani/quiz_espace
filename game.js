import { quiz_espace } from "./questions.js"; // Import des questions

/* VARIABLES CONTAINERS */
// Paragraphe intro
const newParagraph = document.querySelector("#intro");
newParagraph.innerText = quiz_espace.intro;


// paragraphe pour prévenir les joueurs du temps de réponse qu'ils ont
// const timerPhrase = document.querySelector('#timerPhrase')
// timerPhrase.innerText = quiz_espace.timerPhrase
// timerPhrase.classList.remove("hidden")
timerPhrase.classList.remove("hidden")


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
let t = -2;

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


/* VARIABLES PROGRESS BAR 🚀 */
const progressBar = document.querySelector("#progress-bar");
const containerProgressBar = document.querySelector("#progress-bar-container");
const totalQuestions = quiz_espace.questions.length; // Nombre total de questions (ici : 6)
const fuseeProgressBar = document.querySelector("progressFusee");


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
  boutonSuivant.classList.remove("hidden"); // faire apparaitre le bouton "suivant"
  timerPhrase.classList.add("hidden")  // faire disparaitre la phrase warning delai
  paragraphTimer.classList.remove("hidden")
  let myTimeout = setInterval(warningTime, 1000);
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
    const progress = ((textIndex +1) / totalQuestions) * 100;
    progressBar.style.width = progress + "%";
    console.log("image fusee progress bar : ", fuseeProgressBar)
    fuseeProgressBar.classList.remove("hidden");
});


// Calcul score bonnes réponses
function correctAnswerScore(buttonIdClicked, correctAnswer){
  if(buttonIdClicked === correctAnswer){
    scoreIndex++;
  };

  if(scoreIndex <= 2){
    message.innerText = "l'espace, c'est pas ton truc..."
  }else if(scoreIndex >= 3 && scoreIndex <= 7){
    message.innerText = "pas mal, persévère !"
  }else if (scoreIndex > 7){
    message.innerText = "excellent ! tu es prêt pour la prochaine expédition sur Mars !!"
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
            // Une fois une option cliquée, on désactive les autres boutons options
            button.disabled = true;
             // Une fois une option cliquée, on fait apparaitre la bonne réponse
              if (button.id === correctAnswer) {
                  button.style.border = "6px solid green";
              }
        }); 
      }
      // Une fois une option cliquée, on désactive les autres boutons options
      // const allButtons = choixOptions.querySelectorAll("button");
      // allButtons.forEach(button =>{
      //   button.disabled = true;
      // })
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
      scoreBonnesReponses.innerText = ("Bonnes réponses : " + scoreIndex + " / " + quiz_espace.questions.length);
      message.classList.remove("hidden")
      boutonRejouer.classList.remove("hidden");
          // ici on enlève les styles du container questions
     

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
  t = -2
});

 // TIMER ⏰


function warningTime() {
  t++
  console.log('ca marche au bout de 2s')
 
  }

  if(t === 10){
    paragraphTimer.innerHTML = "trop tard"
  }


// Gestion du bouton "Rejouer"
  boutonRejouer.addEventListener("click", function () {
    location.reload(); // Rafraîchir la page
  });

  