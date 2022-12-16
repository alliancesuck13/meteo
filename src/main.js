let userInputWgsX = document.querySelector('.page__input--wgs--x')
let userInputWgsY = document.querySelector('.page__input--wgs--y')
let userInputGskX = document.querySelector('.page__input--gsk--x')
let userInputGskY = document.querySelector('.page__input--gsk--y')

let calculateButton = document.querySelector('.page__button--calculate')
let buttonGsk = document.querySelector('.page__button--gsk')
let buttonWgs = document.querySelector('.page__button--wgs')

let result = document.querySelector('.subheader--result')

let body = document.querySelector('body')

const GSK2011 =
  '+proj=longlat +ellps=GSK2011 +towgs84=0.013,-0.092,-0.03,-0.001738,0.003559,-0.004263,0.0074 +no_defs'

proj4.defs(
  'WGS84',
  '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees'
)

body.onload = () => {
  if (userInputGskX.readOnly === true && userInputGskY.readOnly === true) {
    userInputGskX.style.borderBottomColor = 'red'
    userInputGskY.style.borderBottomColor = 'red'

    buttonWgs.style.backgroundColor = '#00bd7e'
    buttonWgs.style.color = 'white'
  }

  if (userInputWgsX.readOnly === true && userInputWgsY.readOnly === true) {
    userInputWgsX.style.borderBottomColor = 'red'
    userInputWgsY.style.borderBottomColor = 'red'

    buttonGsk.style.backgroundColor = '#00bd7e'
    buttonGsk.style.color = 'white'
  }
}

buttonGsk.onclick = () => {
  userInputGskX.readOnly = false
  userInputGskY.readOnly = false

  userInputWgsX.readOnly = true
  userInputWgsY.readOnly = true
  
  userInputWgsX.style.borderBottomColor = 'red'
  userInputWgsY.style.borderBottomColor = 'red'

  userInputGskX.style.borderBottomColor = '#00bd7e'
  userInputGskY.style.borderBottomColor = '#00bd7e'

  buttonWgs.style.backgroundColor = 'transparent'
  buttonWgs.style.color = '#9a9f9f'

  buttonGsk.style.backgroundColor = '#00bd7e'
  buttonGsk.style.color = 'white'
}

buttonWgs.onclick = () => {
  userInputGskX.readOnly = true
  userInputGskY.readOnly = true

  userInputWgsX.readOnly = false
  userInputWgsY.readOnly = false

  userInputGskX.style.borderBottomColor = 'red'
  userInputGskY.style.borderBottomColor = 'red'

  userInputWgsX.style.borderBottomColor = '#00bd7e'
  userInputWgsY.style.borderBottomColor = '#00bd7e'

  buttonGsk.style.backgroundColor = 'transparent'
  buttonGsk.style.color = '#9a9f9f'

  buttonWgs.style.backgroundColor = '#00bd7e'
  buttonWgs.style.color = 'white'
}

calculateButton.onclick = () => {
  try {
    if (userInputGskX.readOnly === true && userInputGskY.readOnly === true) {
      if (userInputWgsX.value && userInputWgsY.value !== '') {
        let cordResult = proj4('WGS84', GSK2011, [
          Number(userInputWgsX.value),
          Number(userInputWgsY.value),
        ])
        userInputGskX.value = cordResult[0]
        userInputGskY.value = cordResult[1]

        result.textContent = cordResult.join('\n')
      } else {
        result.textContent = 'Введите X и Y'

        userInputGskX.value = ''
        userInputGskY.value = ''
      }
    }

    if (userInputWgsX.readOnly === true && userInputWgsY.readOnly === true) {
      userInputWgsX.style.borderBottomColor = 'red'
      userInputWgsY.style.borderBottomColor = 'red'

      if (userInputGskX.value && userInputGskY.value !== '') {
        let cordResult = proj4(GSK2011, 'WGS84', [
          Number(userInputGskX.value),
          Number(userInputGskY.value),
        ])
        userInputWgsX.value = cordResult[0]
        userInputWgsY.value = cordResult[1]

        result.textContent = cordResult.join('\n')
      } else {
        result.textContent = 'Введите X и Y'

        userInputWgsX.value = ''
        userInputWgsY.value = ''
      }
    }
  } catch (error) {
    alert(`Вы должны вводить только числа!`)
    location.reload()
  }

  // exception
  if (
    userInputWgsX.readOnly === true &&
    userInputWgsY.readOnly === true &&
    userInputGskX.readOnly === true &&
    userInputGskY.readOnly === true
  ) {
    location.reload()
  }
}
