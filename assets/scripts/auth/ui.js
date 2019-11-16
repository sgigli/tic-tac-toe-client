'use strict'

const store = require('../store')

const onSuccess = message => {
  $('#signMessage').text(message)
}

const onFailure = message => {
  $('#signMessage').text(message)
}

const onSignUpSuccess = () => {
  onSuccess('You successfully signed up, now sign in!')
}

const onSignUpFailure = () => {
  onFailure('Please try to sign up again.')
}

const onSignInSuccess = responseData => {
  store.user = responseData.user
  console.log(store)
  onSuccess('You successfully signed in!')
}

const onSignInFailure = () => {
  onFailure('Please try to sign in again')
}

const onSignOutSuccess = () => {
  store.user = {}
  onSuccess('You successfully signed out!')
}

const onSignOutFailure = () => {
  onFailure('Please try to sign out again.')
}

const onChangePasswordSuccess = () => {
  onSuccess('You have successfully changed your password!')
}

const onChangePasswordFailure = () => {
  onFailure('Please try to change your password again')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure
}
