import { quiz_soccer } from "./soccerQuestions.js"; // Import des questions foot

const accueil = document.querySelector('.accueil')
const btnQuizSoccer = document.querySelector('#btnQuizSoccer')
const btnQuizSpace = document.querySelector('#btnQuizSpace')

btnQuizSoccer.addEventListener('click', function(){
    document.body.classList.remove("initial-background");
    accueil.style = "display: none;"
    document.body.classList.add("quizSoccer-background");
})

btnQuizSpace.addEventListener('click', function(){
    accueil.style = "display: none;"
})