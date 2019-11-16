'use strict'
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

// This is game information
let cells = 9
let currentPlayer = 'X'
$('#currentPlayer').text('X')

const addLetter = event => {
  if (!$(event.target).html()) {
    $('#message').text('')
    $(event.target).html(currentPlayer)
    cells--
    if (checkWin(threeInARow)) {
      $('#message').text(currentPlayer + ' wins!')
      $('.col-sm').off('click', addLetter)
    } else if (cells === 0) {
      $('#message').text('It is a tie!')
      $('.col-sm').off('click', addLetter)
    } else {
      currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'
      $('#currentPlayer').text(currentPlayer)
    }
  } else {
    $('#message').text('Please select another space')
  }
}

const addHandlers = () => {
  $('.col-sm').on('click', addLetter)
}

module.exports = {
  addHandlers
}
