let countdown
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
    // clear bestaande timers
    clearInterval(countdown)
    const now = Date.now()
    //now is in miliseconds en seconds is in seconds daarom moet het nog keer 1000
    const then = now + seconds * 1000;
    displayTimeLeft(seconds)
    displayEndTime(then)


    countdown = setInterval(() =>{
        // delen door 1000 om terug te gaan naar seconden
        const secondsLeft = Math.round((then - Date.now() )/ 1000)
        //check of de timer gestopt moet worden
        if(secondsLeft < 0){
            clearInterval(countdown)
            return
        }
        displayTimeLeft(secondsLeft)
    },1000)
}
function displayTimeLeft(seconds){

    const minutes = Math.floor(seconds /60)
    const remainderSeconds = seconds % 60
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`
    timerDisplay.textContent = display

}

function displayEndTime(timestamp){
    const end = new Date(timestamp)
    const hour = end.getHours()
    const minutes = end.getMinutes()
    endTime.textContent = ` Be Back @${hour}:${minutes < 10 ? '0' : '' }${minutes}`
}
function startTimer(){
    const seconds = parseInt(this.dataset.time)
    timer(seconds)
}
buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function(e){
    e.preventDefault()
    const mins = this.minutes.value
    timer(mins * 60)
    this.reset()
    console.log(mins)
})