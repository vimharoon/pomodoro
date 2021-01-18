;(function () {
  'use strict'

  let intervalTimer = null

  /**
   * @function onChangeActionBtn
   * function to handle click events on action buttons
   */
  const onChangeActionBtn = () => {
    const elems = document.querySelectorAll('.pomodo-item')

    elems.forEach((el) => {
      el.addEventListener('click', (evt) => {
        const currEl = evt.srcElement || evt.target
        ;[].forEach.call(elems, (el) => {
          el.classList.remove('active')
        })
        clearInterval(intervalTimer)
        setPomodoroTimer(60 * +currEl.getAttribute('data-value'))
        currEl.classList.add('active')
      })
    })
  }

  const setPomodoroTimer = (duration) => {
    const clockTimerEl = document.getElementById('clock-time')
    const pauseBtn = document.getElementById('pause-btn')
    let timer = duration,
      minutes = '00',
      seconds = '00',
      isTimerPause = false

    intervalTimer = setInterval(() => {
      if (!isTimerPause) {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10)

        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds

        clockTimerEl.textContent = minutes + ':' + seconds
        setProgressRing((timer / duration) * 100)

        if (--timer < 0) {
          timer = duration
        }
      }
    }, 1000)

    pauseBtn.addEventListener('click', () => {
      isTimerPause = !isTimerPause ? true : false
      isTimerPause
        ? (pauseBtn.textContent = 'RESUME')
        : (pauseBtn.textContent = 'PAUSE')
    })
  }

  const setProgressRing = (percent) => {
    const circle = document.querySelector('.progress-ring__circle')
    const radius = circle.r.baseVal.value
    const circumference = radius * 2 * Math.PI

    circle.style.strokeDasharray = `${circumference} ${circumference}`
    circle.style.strokeDashoffset = circumference

    const offset = circumference - (percent / 100) * circumference
    circle.style.strokeDashoffset = offset
  }

  document.getElementById('settings').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'block'
    document.querySelector('.wrapper').classList.add('is-blurred')
  })

  document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none'
    document.querySelector('.wrapper').classList.remove('is-blurred')
  })

  const init = () => {
    onChangeActionBtn()
    setPomodoroTimer(60 * 25)
  }

  document.addEventListener('DOMContentLoaded', init)
})()
