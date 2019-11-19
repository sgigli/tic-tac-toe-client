Technologies used: GIT, GitHub, Bootstrap, local APIs

Planning and execution: To start, I wrote down user stories and drew a wireframe
of the site, wanting to make it clear and coherent. I planned out the game logic
by first abstracting the steps and then trying to write the code for them.
Having a picture of how the game would flow helped me when bumps in the code
came up. Writing the game logic, I tried to keep the code simple, asking myself
if there were cleaner ways to go about the tasks. I then connected to the API,
writing from separate linked files for organzation, and registering its
responses in places that best fit with the game logic.

Unsolved problems: How to register incomplete games

Wireframe: https://imgur.com/a/QCCycoz

User Story:
As unregistered user, I would ike to sign up with email, pw, and pwc:
  -if email is taken then show error message
  -if pw and pwc dont match then show error message
  -if email is valid and pw and pwc match then show success message

As a registered, logged Out User, I would like the option to sign in:
  -I am notified if I mistype my username or pw

As a logged in user, I want to play tic tac toe:
  -click a button "Start Game" and the gameboard should appear
  -first player should be able to add an x to a spot on the board
  -turn should rotate x and o
  -player should not be able to select a taken spot
  -want to be notified after clicks
  -want to be able to see a record of my games
  -want to be able to reset the game
