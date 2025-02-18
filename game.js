import { quiz_espace } from './questions.js'; // Import des questions


// Paragraphe intro
const newParagraph = document.querySelector('#intro')
console.log("paragraphe intro")
newParagraph.innerText = quiz_espace.intro


// questions
const quizEspaceElement = document.querySelector('#question-text')
console.log("première question")

// options
const choixOptions = document.querySelector('#options-container')
// boutons options
const boutonOption = document.createElement('button')


quizEspaceElement.appendChild(newParagraph)

// bouton "Let's go!"
const boutonStart = document.querySelector('#start-button')
// bouton "Suivant"
const boutonSuivant = document.querySelector('#next-button')


console.log(boutonSuivant)

let textIndex = 0;

// affichage de la première question & de ses options
boutonStart.addEventListener("click", function(){
    console.log("premiere question")
    quizEspaceElement.innerText = quiz_espace.questions[textIndex].text

    choixOptions.innerText = quiz_espace.questions[textIndex].options   
   
    boutonStart.classList.add('hidden')

    boutonSuivant.classList.remove('hidden')  // faire apparaitre le bouton "suivant"


    // for (const item of quiz_espace.questions) {
    //     console.log('😶‍🌫️', questions[textIndex].text)
    //    //console.log('😶‍🌫️', item.questions)
    //     boutonStart.classList.add('hidden')
    //     boutonSuivant.classList.remove('hidden')  // faire apparaitre le bouton "suivant"

    
    //     const newButton = document.createElement('button')
    //     newButton.innerText = item.text
    //     newButton.style.color = 'blue'
    //     newButton.style.fontSize = '20px'
    
    //     quizEspaceElement.appendChild(newButton)
    // }
})


<<<<<<< HEAD
    quizEspaceElement.appendChild(newButton)
}
=======










// for (const item of quiz_espace.questions){
//     console.log("hello", item.intro)
// }

>>>>>>> 2c5e2418b286c73bdbe3ca037390f8b972d16561
