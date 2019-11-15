'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const gameEvents = require('./game/events')
const authEvents = require('./auth/events')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // your JS code goes here
  gameEvents.addHandlers()
  authEvents.addHandlers()


  // $('.col-sm').on('click', function (event) {
  //   $(event.target).html('X')
  //   console.log(event.target)
  // })
})
