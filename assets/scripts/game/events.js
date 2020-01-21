'use strict'

const api = require('./api')
const ui = require('./ui')
// const store = require('../store')

const threeInARow = {
  row1: [0, 1, 2],
  row2: [3, 4, 5],
  row3: [6, 7, 8],
  col1: [0, 3, 6],
  col2: [1, 4, 7],
  col3: [2, 5, 8],
  dia1: [0, 4, 8],
  dia2: [2, 4, 6]
}

const checkWin = cells => {
  return Object.keys(threeInARow).find(e =>
    cells[threeInARow[e][0]] &&
    cells[threeInARow[e][0]] === cells[threeInARow[e][1]] &&
    cells[threeInARow[e][1]] === cells[threeInARow[e][2]]
  )
}

const twoInRow = (letter) => {
  return Object.keys(threeInARow).find(e =>
    (cells[threeInARow[e][0]] === letter && !cells[threeInARow[e][2]] &&
    cells[threeInARow[e][0]] === cells[threeInARow[e][1]]) ||
    (cells[threeInARow[e][0]] === letter && !cells[threeInARow[e][1]] &&
    cells[threeInARow[e][0]] === cells[threeInARow[e][2]]) ||
    (cells[threeInARow[e][1]] === letter && !cells[threeInARow[e][0]] &&
    cells[threeInARow[e][1]] === cells[threeInARow[e][2]])
  )
}

const oneInRow = () => {
  return Object.keys(threeInARow).find(e =>
    (cells[threeInARow[e][0]] === 'O' && !cells[threeInARow[e][1]] && !cells[threeInARow[e][2]]) ||
    (!cells[threeInARow[e][0]] && cells[threeInARow[e][1]] === 'O' && !cells[threeInARow[e][2]]) ||
    (!cells[threeInARow[e][0]] && !cells[threeInARow[e][1]] && cells[threeInARow[e][2]] === 'O')
  )
}

const spaceIsEmpty = event => {
  return !$(event.target).html()
}

const updateUserMessage = message => {
  $('#upper-left').text(message)
}

const insertLetter = event => {
  $(event.target).html(currentPlayer)
  cells[event.target.id] = currentPlayer
}

const gridIsEmpty = () => {
  return cells.indexOf('') !== -1 ? false : true
}

const dontAllowMoreLetters = () => {
  $('.col-sm').off('click', addLetter)
  console.log(cells)
  over = true
}

const updateCurrentPlayer = () => {
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'
}

const updateCurrentPlayerMessage = () => {
  $('#currentPlayer').text(currentPlayer)
}

// This is game information
let cells = ['', '', '', '', '', '', '', '', '']
let currentPlayer = 'X'
$('#currentPlayer').text('X')
let over = false

const addLetterToApi = (id, currentPlayer, over) => {
  console.log(id, currentPlayer, over)
  console.log(typeof currentPlayer)
  api.addLetter(id, currentPlayer, over)
    .then(ui.onAddLetterSuccess)
    .catch(ui.onAddLetterFailure)
}

const addLetter = event => {
  if (spaceIsEmpty(event)) {
    updateUserMessage(' ')
    insertLetter(event)
    if (checkWin(cells)) {
      updateUserMessage(currentPlayer + ' wins!')
      dontAllowMoreLetters()
      addLetterToApi(event.target.id, currentPlayer.toLowerCase(), over)
    } else if (gridIsEmpty()) {
      updateUserMessage('It is a tie!')
      dontAllowMoreLetters()
      addLetterToApi(event.target.id, currentPlayer.toLowerCase(), over)
    } else {
      addLetterToApi(event.target.id, currentPlayer.toLowerCase(), over)
      if (computer) {
        setTimeout(computerMove, 400)
      } else {
        updateCurrentPlayer()
        updateCurrentPlayerMessage()
      }
    }
  } else {
    updateUserMessage('Please select another space')
  }
}

const computerMove = () => {
  const twoO = twoInRow('O')
  const twoX = twoInRow('X')
  const oneO = oneInRow('O')

  if (twoO) {
    const index = threeInARow[twoO].find(i => cells[i] === '')
    computerInsertLetter(index)
    if (checkWin(cells)) {
      updateUserMessage('O' + ' wins!')
      dontAllowMoreLetters()
      addLetterToApi(index, 'o', over)
    }
  } else if (twoX) {
    const index = threeInARow[twoX].find(i => cells[i] === '')
    computerInsertLetter(index)
    addLetterToApi(index, 'o', over)
  } else if (oneO) {
    const index = threeInARow[oneO].find(i => cells[i] === '')
    computerInsertLetter(index)
    addLetterToApi(index, 'o', over)
  } else {
    let check = true
    let index
    while (check) {
      index = Math.floor(Math.random() * 9)
      if ($(`#${index}`).html()) {
      } else {
        check = false
      }
    }
    computerInsertLetter(index)
    addLetterToApi(index, 'o', over)
  }
}

const computerInsertLetter = (index) => {
  $(`#${index}`).html('O')
  cells[index] = 'O'
}

const showRecord = games => {
  let wins = 0
  let losses = 0
  let ties = 0
  games.games.forEach(function (ele) {
    console.log(ele)
    if (checkWin(ele.cells)) {
      if (ele.cells[threeInARow[checkWin(ele.cells)][0]] === 'x') {
        wins++
      } else if (ele.cells[threeInARow[checkWin(ele.cells)][0]] === 'o') {
        losses++
      }
    } else {
      ties++
    }
  })
  const total = wins + losses + ties
  updateUserMessage(`Total: ${total} - Wins: ${wins} - Losses: ${losses} - Ties: ${ties}`)
}

const getGames = () => {
  api.getGames()
    .then(showRecord)
    .then(ui.onGetGamesSuccess)
    .catch(ui.onGetGamesFailure)
}

let computer
const newGame = () => {
  const opponent = document.getElementById('dropdown').value
  if (opponent === 'player 2') {
    computer = false
  } else if (opponent === 'computer') {
    computer = true
  }
  updateUserMessage('New game!')
  $('.col-sm').html('')
  if (!cells.find(ele => ele === 'X' || ele === 'O') || over === true) {
    $('.col-sm').on('click', addLetter)
  }
  // $('.col-sm').on('click', addLetter)
  cells = ['', '', '', '', '', '', '', '', '']
  currentPlayer = 'X'
  over = false
  updateCurrentPlayerMessage()
  api.create()
    .then(ui.onCreateSuccess)
    .catch(ui.onCreateFailure)
}

const signOutReset = () => {
  updateUserMessage('')
  $('.col-sm').html('')
  $('.col-sm').off('click', addLetter)
  cells = ['', '', '', '', '', '', '', '', '']
  currentPlayer = 'X'
  over = false
  updateCurrentPlayerMessage()
}

const addHandlers = () => {
  $('#newGame').on('click', newGame)
  $('#getGames').on('click', getGames)
}

module.exports = {
  addHandlers,
  signOutReset
}
