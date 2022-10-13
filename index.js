function getComputerChoice() {
    const option = ['paper','rock','scissor']
    let choice = Math.floor(Math.random() * 3)
    return option[choice]
}

function getPlayerChoice() {
    choice = prompt("choose paper/rock/scissor")
    choice.toUpperCase()
    if(choice!='paper' && choice!='rock' && choice!='scissor') {
        console.log('please enter again')
        getPlayerChoice()
    }
    return choice
}

function play(playerSelection,computerSelection) {
    const selection = ['paper','rock','scissor']
    let state

    if(playerSelection === selection[0]){
        if(computerSelection === selection[0]) state = 'draw'
        else if(computerSelection === selection[1]) state = 'win'
        else if(computerSelection === selection[2]) state = 'lose'
    }
    if(playerSelection === selection[1]){
        if(computerSelection === selection[0]) state = 'lose'
        else if(computerSelection === selection[1]) state = 'draw'
        else if(computerSelection === selection[2]) state = 'win'
    }
    if(playerSelection === selection[2]){
        if(computerSelection === selection[0]) state = 'win'
        else if(computerSelection === selection[1]) state = 'lose'
        else if(computerSelection === selection[2]) state = 'draw'
    }

    return state
}

function game() {
    let playerScore=0, computerScore=0
    for(i=0; i<5; i++) {
        let computer = getComputerChoice()
        let player = getPlayerChoice()
        if(play(player,computer) === 'win') {
            playerScore+=1
            console.log(`you win! ${player} beat ${computer}`)
        }
        else if(play(player,computer) === 'lose') {
            computerScore+=1
            console.log(`you lose! ${computer} beat ${player}`)
        }
        else{
            console.log(`tied game`)
        }
        console.log(`player: ${playerScore}, computer: ${computerScore}`)
    }
}

game()
