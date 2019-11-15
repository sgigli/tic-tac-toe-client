'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')

const onSignUp = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  api.signUp(formData)
    .then(console.log()) // ui.onSignUpSuccess)
    .catch(console.error()) // ui.onSignUpFailure)
}

const onSignIn = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  api.signIn(formData)
    .then(console.log()) // ui.onSignUpSuccess)
    .catch(console.log()) // ui.onSignUpFailure)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
}

module.exports = {
  addHandlers
}
