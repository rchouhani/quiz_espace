import { quiz_espace } from './questions.js'; // Import des questions


// Paragraphe intro
const newParagraph = document.querySelector('#intro')
console.log("paragraphe intro")
newParagraph.innerText = quiz_espace.intro


// questions
const quizEspaceElement = document.querySelector('#question-text')
console.log("première question")

quizEspaceElement.appendChild(newParagraph)

// bouton "Let's go!"
const boutonStart = document.querySelector('#start-button')
const boutonSuivant = document.querySelector('#next-button')
console.log(boutonSuivant)
boutonStart.addEventListener("click", function(){
    for (const item of quiz_espace.questions) {
        console.log('😶‍🌫️', item.questions)
        boutonStart.classList.add('hidden')
        boutonSuivant.classList.remove('hidden')  // faire apparaitre le bouton "suivant"

    
        const newButton = document.createElement('button')
        newButton.innerText = item.text
        newButton.style.color = 'blue'
        newButton.style.fontSize = '20px'
    
        quizEspaceElement.appendChild(newButton)
    }
})
