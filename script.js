const diceEl = document.querySelector('.dice')
const totalScore0 = document.querySelector('#score--0')
const totalScore1 = document.querySelector('#score--1')
const player0 = document.querySelector('.player--0')
const player1 = document.querySelector('.player--1')

const currentScore0El = document.querySelector('#current--0')
const currentScore1El = document.querySelector('#current--1')

const rollBtnEl = document.querySelector('.btn--roll')
const holdBtnEl = document.querySelector('.btn--hold')
const newGameBtnEl = document.querySelector('.btn--new')


let currentScore;
let activePlayer;
let totalScores;
let isPlaying;
// ! короткая запись кода выше  let currentScore, activePlayer, totalScores, isPlaying;


// ! Рефакторная часть
const initGame = () => {
    totalScore0.textContent = 0
    totalScore1.textContent = 0
    
    currentScore = 0
    activePlayer = 0
    totalScores = [0, 0]

    player1.classList.remove('player--active')
    player1.classList.remove('player--winner')
    player0.classList.remove('player--winner')
    player0.classList.add('player--active')

    isPlaying = true
    diceEl.classList.add('hidden')
}



const changeActivePlayer = () => {
    document.querySelector(`#current--${activePlayer}`).textContent = 0
    currentScore = 0

    activePlayer = activePlayer === 0 ? 1 : 0
        
    player0.classList.toggle('player--active')
    player1.classList.toggle('player--active')
}


// ! Рефакторная часть закончена


initGame()

rollBtnEl.addEventListener('click', () => {
    if (isPlaying) {
        // ! 1) Generate random number from 1 to 6 
        const randomNumber = Math.trunc(Math.random() * 6) + 1
    
        // ! 2) Display roll dice
        diceEl.src = `dice-${randomNumber}.png`
        diceEl.classList.remove('hidden')

        // ! 3) Check for 1 
        if (randomNumber !== 1) {

            // ! 4) Add dice roll to current score
            currentScore += randomNumber
        
            // ! 5) Display new score
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore

        } else {
            // ! 6) Switch new score
            changeActivePlayer()
        }
    }

})

holdBtnEl.addEventListener('click', () => {
    if (isPlaying) {
        // ! 1) add current score to total score
        totalScores[activePlayer] += currentScore
        document.querySelector(`#score--${activePlayer}`).textContent = totalScores[activePlayer]
    
        // ! 2) if score >= 20 
        if (totalScores[activePlayer] >= 20) {
            // current player wins
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            // игрок становится победилетем
            diceEl.classList.add('hidden')
            // remove dice picture
            document.querySelector(`#current--${activePlayer}`).textContent = 0
            // current score set to 0
            isPlaying = false
            // change state of game
        } else {
            // switch active player 
            changeActivePlayer()
        }
    }
    
})

newGameBtnEl.addEventListener('click', initGame) 

console.log('hello')