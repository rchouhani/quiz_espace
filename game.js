import { quiz_espace } from './questions.js'; // Import des questions

const quizEspaceElement = document.querySelector('#question-text')
console.log("première question")

for (const item of quiz_espace.questions) {
    console.log('😶‍🌫️', item.questions)

    const newButton = document.createElement('button')
    newButton.innerText = item.text
    newButton.style.color = 'blue'
    newButton.style.fontSize = '20px'


    quizEspaceElement.appendChild(newButton)
}
