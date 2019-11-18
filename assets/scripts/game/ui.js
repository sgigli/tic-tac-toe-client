'use strict'

const store = require('../store')

const onCreateSuccess = responseData => {
  store.game = responseData.game
  console.log(store)
}

const onCreateFailure = () => {
  console.log('Something went wrong')
}

const onAddLetterSuccess = responseData => {
  store.game = responseData.game
  console.log(store)
}

const onAddLetterFailure = () => {
  console.log('Something went wrong')
}

const onGetGamesSuccess = responseData => {
  console.log(responseData)
}

const onGetGamesFailure = responseData => {
  console.log('Something went wrong')
}

module.exports = {
  onCreateSuccess,
  onCreateFailure,
  onAddLetterSuccess,
  onAddLetterFailure,
  onGetGamesSuccess,
  onGetGamesFailure
}
