const startButton = document.querySelector('#start-button')
const selections = document.querySelectorAll('#selection')
const playerSide = document.querySelector('#player-selection')
const computerSide = document.querySelector('#computer-selection')
const rnd = document.querySelector('#round')
const gameText = document.querySelector('#game-text')
const playerScore = document.querySelectorAll('[data-score="player"]')
const computerScore = document.querySelectorAll('[data-score="computer"]')
const overlay = document.querySelector('#overlay')
const endGameText = document.querySelector('#end-game-text')
const restartButton = document.querySelector('#restart')

const round = {
    player: '',
    computer: '',
    computerScore: 0,
    playerScore: 0,
    winner: '',
    idx: 1
}

function displaySelection(selection, side) {
    while (side.hasChildNodes()) {
        side.removeChild(side.firstChild);
    }
    if (selection == null) {
        side.style.backgroundColor = 'hsl(200,80%,60%,.8)'
        return
    }
    const cloneNode = selection.firstElementChild.cloneNode(true)
    cloneNode.style.color = 'hsl(200,80%,60%,.8)'
    side.style.backgroundColor = 'transparent'
    side.appendChild(cloneNode)

}

function updateGameText(text) {
    gameText.textContent = text
}

selections.forEach(selection => {
    selection.addEventListener('click', () => {
        selections.forEach(s => {
            s.style.borderColor = 'transparent'
        })
        if (round.player == selection.dataset.selection) {
            round.player = ''
            startButton.style.opacity = .3
            displaySelection(null, playerSide)
        }
        else {
            round.player = selection.dataset.selection
            selection.style.borderColor = 'hsl(200, 80%, 60%)'
            startButton.style.opacity = 1
            displaySelection(selection, playerSide)
        }
        updateGameText(round.player)
        displaySelection(null, computerSide)
    })
});

startButton.addEventListener('click', () => {
    if (round.player == '') {
        updateGameText('Please select an option to start')
        return
    }
    Game()
})

function Game() {
    getComputerSelection()
    findWinner()
    console.log(round.winner)
    if (round.winner == 'p') {
        playerScore[round.playerScore].style.color = 'hsl(200,80%,60%)'
        round.playerScore += 1
        updateGameText(`You Win!`)
    }
    else if (round.winner == 'c') {
        computerScore[round.computerScore].style.color = 'hsl(200,80%,60%)'
        round.computerScore += 1
        updateGameText(`You lose!`)
    }
    else if (round.winner == 'd') {
        updateGameText(`Draw!`)
    }
    round.computer = ''
    round.player = ''
    round.idx+=1
    rnd.textContent = `Round ${round.idx}`
    selections.forEach(s => {
        s.style.borderColor = 'transparent'
    })
    startButton.style.opacity = .3

    if (round.computerScore == 5) {
        endGame('computer')
    }
    else if (round.playerScore == 5) {
        endGame('player')
    }
}

function findWinner() {
    const selection = ['paper', 'rock', 'scissors']
    let winner

    if (round.player == selection[0]) {
        if (round.computer == selection[0]) winner = 'd'
        else if (round.computer == selection[1]) winner = 'p'
        else if (round.computer == selection[2]) winner = 'c'
    }
    else if (round.player == selection[1]) {
        if (round.computer == selection[0]) winner = 'c'
        else if (round.computer == selection[1]) winner = 'd'
        else if (round.computer == selection[2]) winner = 'p'
    }
    else if (round.player == selection[2]) {
        if (round.computer == selection[0]) winner = 'p'
        else if (round.computer == selection[1]) winner = 'c'
        else if (round.computer == selection[2]) winner = 'd'
    }
    round.winner = winner
}

function getComputerSelection() {
    const selection = ['paper', 'rock', 'scissors']
    let idx = Math.floor(Math.random() * 3)
    round.computer = selection[idx]
    displaySelection(selections[idx], computerSide)
}

function endGame(winner) {
    if (winner == 'player') {
        endGameText.textContent = 'You Win!'
        overlay.style.display = 'flex'
    }
    else if(winner == 'computer') {
        endGameText.textContent = 'computer Win!'
        overlay.style.display = 'flex'
    }
    restartButton.addEventListener('click',()=> {
        overlay.style.display = 'none'
        round.computerScore =0
        round.playerScore =0
        playerScore.forEach(score => {
            score.style.color = 'black'
        })
        computerScore.forEach(score => {
            score.style.color = 'black'
        })
        round.idx =0
        rnd.textContent = 'Round 1'
        gameText.textContent = ''
    })
}









