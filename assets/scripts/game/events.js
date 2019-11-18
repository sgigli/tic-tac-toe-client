'use strict'

const api = require('./api')
const ui = require('./ui')

const threeInARow = {
  row1: [$('#0'), $('#1'), $('#2')],
  row2: [$('#3'), $('#4'), $('#5')],
  row3: [$('#6'), $('#7'), $('#8')],
  col1: [$('#0'), $('#3'), $('#6')],
  col2: [$('#1'), $('#4'), $('#7')],
  col3: [$('#2'), $('#5'), $('#8')],
  dia1: [$('#0'), $('#4'), $('#8')],
  dia2: [$('#2'), $('#4'), $('#6')]
}

const checkWin = threeInARow => {
  return Object.keys(threeInARow).find(e =>
    threeInARow[e][0].html() &&
    threeInARow[e][0].html() === threeInARow[e][1].html() &&
    threeInARow[e][1].html() === threeInARow[e][2].html()
  )
}

const spaceIsEmpty = event => {
  return !$(event.target).html()
}

const updateUserMessage = message => {
  $('#message').text(message)
}

const insertLetter = event => {
  $(event.target).html(currentPlayer)
}

const oneLessBox = () => {
  cells--
}

const gridIsEmpty = () => {
  if (cells === 0) {
    return true
  } else {
    return false
  }
}

const dontAllowMoreLetters = () => {
  $('.col-sm').off('click', addLetter)
  over = true
}

const updateCurrentPlayer = () => {
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'
}

const updateCurrentPlayerMessage = () => {
  $('#currentPlayer').text(currentPlayer)
}

// This is game information
let cells = 9
let currentPlayer = 'X'
$('#currentPlayer').text('X')
let over = false

const addLetter = event => {
  if (spaceIsEmpty(event)) {
    updateUserMessage('')
    insertLetter(event)
    api.addLetter(event.target.id, currentPlayer.toLowerCase(), over)
      .then(ui.onAddLetterSuccess)
      .catch(ui.onAddLetterFailure)
    oneLessBox()
    if (checkWin(threeInARow)) {
      updateUserMessage(currentPlayer + ' wins!')
      dontAllowMoreLetters()
    } else if (gridIsEmpty()) {
      updateUserMessage('It is a tie!')
      dontAllowMoreLetters()
    } else {
      updateCurrentPlayer()
      updateCurrentPlayerMessage()
    }
  } else {
    updateUserMessage('Please select another space')
  }
}

const createGame = () => {
  $('.col-sm').on('click', addLetter)
  api.create()
    .then(ui.onCreateSuccess)
    .catch(ui.onCreateFailure)
}

const getGames = () => {
  api.getGames()
    .then(ui.onGetGamesSuccess)
    .catch(ui.onGetGamesFailure)
}

const addHandlers = () => {
  $('#play').on('click', createGame)
  $('#getGames').on('click', getGames)
}

module.exports = {
  addHandlers
}
