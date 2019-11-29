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
  $('#play').off('click', newGame)
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
      updateCurrentPlayer()
      updateCurrentPlayerMessage()
    }
  } else {
    updateUserMessage('Please select another space')
  }
}

const showRecord = games => {
  let wins = 0
  let losses = 0
  let ties = 0
  games.games.forEach(function (ele) {
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

const newGame = () => {
  updateUserMessage('New game!')
  $('.col-sm').html('')
  $('.col-sm').on('click', addLetter)
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
