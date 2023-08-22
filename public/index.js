//UTILITY FUNCTIONS
function showElement(element) {
    element.classList.remove("hide-element")
}

function hideElement(element) {
    element.classList.add("hide-element")
}

function disableElement(element) {
    element.disabled = true
}

function enableElement(element) {
    element.disabled = false
}

function getTimeStr(timeObj) {  
    const {hours, minutes, seconds} = timeObj
    
    const hoursStr = String(hours).padStart(2,0)
    const minutesStr = String(minutes).padStart(2,0)
    const secondsStr = String(seconds).padStart(2,0)
    
    return `${hoursStr}:${minutesStr}:${secondsStr}`
}





//MODE COMPONENTS
const clock = document.getElementById('clock')
const timer = document.getElementById('timer')
const stopwatch = document.getElementById('stopwatch')

//MODE SWITCHING
const clockModeBtn = document.getElementById('mode__clock')
const timerModeBtn = document.getElementById('mode__timer')
const stopwatchModeBtn = document.getElementById('mode__stopwatch')

let currentMode = "mode__" + "clock"

function changeMode(modeStr) {
    const modes = ["clock", "timer", "stopwatch"]
    const newMode = modeStr.split('__')[1]

    modes.map(mode => {
        if (mode === newMode) {
            showElement(eval(newMode))
            eval(`${newMode}ModeBtn`).classList.add("mode__btn--active")
        } else {
            hideElement(eval(mode))
            eval(`${mode}ModeBtn`).classList.remove("mode__btn--active")
        }
    })
}

changeMode(currentMode)

clockModeBtn.addEventListener('click', (e) => {changeMode(e.target.id)})
timerModeBtn.addEventListener('click', (e) => {changeMode(e.target.id)})
stopwatchModeBtn.addEventListener('click', (e) => {changeMode(e.target.id)})





//CLOCK MODE
const clockText = document.getElementById('clock_text')

let currentTime = ""

function setClock() {
    const dateOptions = { 
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit" 
    }
    currentTime = new Date().toLocaleTimeString("en-US", dateOptions).slice(0,8)
    console.log(currentTime)
    clockText.textContent = currentTime
}

setClock()

setInterval(() => {
    setClock()
}, 1000)





//TIMER MODE
const timerText = document.getElementById('timer_text')
const timerForm = document.getElementById('timer_form')
const timerFormHours = document.getElementById('timer_form__hours')
const timerFormMinutes = document.getElementById('timer_form__minutes')
const timerFormSeconds = document.getElementById('timer_form__seconds')
const timerStartBtn = document.getElementById('timer_controls__start')
const timerStopBtn = document.getElementById('timer_controls__stop')
const timerResetBtn = document.getElementById('timer_controls__reset')

const defaultTimerTime = {
    hours: 0,
    minutes: 0,
    seconds: 0
}

let timerTime = {...defaultTimerTime}

let isTimerRunning = false
let isTimerDone = false

function setTimer(timeObj) {
    if (timeObj) {timerTime = timeObj}
    const {hours, minutes, seconds} = timerTime

    timerFormHours.value = hours
    timerFormMinutes.value = minutes
    timerFormSeconds.value = seconds

    timerText.textContent = getTimeStr(timerTime)
}

function startTimer () {
    isTimerRunning = true
    timerCountdown = setInterval(decrementTimer, 1000)

    //DISABLE ELEMENTS
    disableElement(timerStartBtn)
    disableElement(timerResetBtn)
    disableElement(timerFormHours)
    disableElement(timerFormMinutes)
    disableElement(timerFormSeconds)

    //ENABLE ELEMENTS
    enableElement(timerStopBtn)
    
    //HIDE ELEMENTS
    hideElement(timerForm)
    hideElement(timerStartBtn)

    //SHOW ELEMENTS
    showElement(timerText)
    showElement(timerStopBtn)
}

function stopTimer() {
    isTimerRunning = false
    clearInterval(timerCountdown)

    //DISABLE ELEMENTS
    disableElement(timerStopBtn)

    //ENABLE ELEMENTS
    enableElement(timerResetBtn)
    !isTimerDone && enableElement(timerStartBtn)

    //HIDE ELEMENTS
    hideElement(timerStopBtn)

    //SHOW ELEMENTS
    showElement(timerStartBtn)
}

function resetTimer() {
    isTimerDone = false
    setTimer(defaultTimerTime)

    //RESET TIMER FORM VALUES
    timerFormHours.value = null
    timerFormMinutes.value = null
    timerFormSeconds.value = null

    //DISABLE ELEMENTS
    disableElement(timerResetBtn)

    //ENABLE ELEMENTS
    enableElement(timerStartBtn)
    enableElement(timerFormHours)
    enableElement(timerFormMinutes)
    enableElement(timerFormSeconds)

    //HIDE ELEMENTS
    hideElement(timerText)

    //SHOW ELEMENTS
    showElement(timerForm)
}

function decrementTimer() { 
    let {hours, minutes, seconds} = timerTime
    
    if (seconds) {
        seconds = seconds - 1
    } else if (minutes) {
        minutes = minutes - 1
        seconds = seconds + 59
    } else if (hours) {
        hours = hours - 1
        minutes = minutes + 59
        seconds = seconds + 59
    }

    setTimer({
        hours: hours, 
        minutes: minutes, 
        seconds: seconds
    })
    
    if (hours === 0 && minutes === 0 && seconds === 0) {
        isTimerDone = true
        stopTimer()
    }
}

function handleTimerInput(e) {
    const {name, value} = e.target

    if (value > 59) {
        alert(`Please enter a value of 59 or less for ${name}`)
    } else {
        timerTime[name] = parseInt(value)
    }
    
    setTimer()
}

timerForm.addEventListener('change', handleTimerInput)
timerStartBtn.addEventListener('click', startTimer)
timerStopBtn.addEventListener('click', stopTimer)
timerResetBtn.addEventListener('click', resetTimer)





//STOPWATCH MODE
const stopwatchText = document.getElementById('stopwatch_text')
const stopwatchStartBtn = document.getElementById('stopwatch_controls__start')
const stopwatchStopBtn = document.getElementById('stopwatch_controls__stop')
const stopwatchResetBtn = document.getElementById('stopwatch_controls__reset')

let stopwatchTime = 0
let isStopwatchRunning = false

function setStopwatch() {
    stopwatchText.textContent = (stopwatchTime / 100).toFixed(2)
}

function startStopwatch () {
    isStopwatchRunning = true
    stopwatchInterval = setInterval(incrementStopwatch, 10)

    //DISABLE ELEMENTS
    disableElement(stopwatchStartBtn)
    disableElement(stopwatchResetBtn)

    //ENABLE ELEMENTS
    enableElement(stopwatchStopBtn)

    //HIDE ELEMENTS
    hideElement(stopwatchStartBtn)

    //SHOW ELEMENTS
    showElement(stopwatchStopBtn)
}

function stopStopwatch() {
    isStopwatchRunning = false
    clearInterval(stopwatchInterval)

    //DISABLE ELEMENTS
    disableElement(stopwatchStopBtn)

    //ENABLE ELEMENTS
    enableElement(stopwatchResetBtn)
    enableElement(stopwatchStartBtn)

    //HIDE ELEMENTS
    hideElement(stopwatchStopBtn)

    //SHOW ELEMENTS
    showElement(stopwatchStartBtn)
}

function resetStopwatch() {
    stopwatchTime = 0
    setStopwatch()

    //DISABLE ELEMENTS
    disableElement(stopwatchResetBtn)

    //ENABLE ELEMENTS
    enableElement(stopwatchStartBtn)
}

function incrementStopwatch() {
    stopwatchTime++
    setStopwatch()
}

stopwatchStartBtn.addEventListener('click', startStopwatch)
stopwatchStopBtn.addEventListener('click', stopStopwatch)
stopwatchResetBtn.addEventListener('click', resetStopwatch)