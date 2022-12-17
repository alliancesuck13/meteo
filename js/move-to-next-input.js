import {
  userInputGskX,
  userInputWgsX,
  userInputGskY,
  userInputWgsY,
} from './main.js'

const moveToNextInput = () => {
  userInputGskX.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      userInputGskY.focus()
    }
  })

  userInputWgsX.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      userInputWgsY.focus()
    }
  })
}

export { moveToNextInput }
