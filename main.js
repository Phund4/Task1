const hours = document.getElementById('hour');
const minutes = document.getElementById('minute');
const seconds = document.getElementById('second');
const start = document.getElementById('start');
const end = document.getElementById('stop');
const clear = document.getElementById('clear');
const PTimer = document.getElementById('timer');
const PError = document.getElementById('error');

let inputs = [hours, minutes, seconds];
let timer;

function isCorrect(input, number) {
    if(parseInt(input.value) < 0 || parseInt(input.value) >= number || !parseInt(input.value)) {
        PError.classList.remove('isHide');
        input.classList.add('redBorder');
        return false;
    } else {
        input.classList.remove('redBorder');
        return true;
    }
}

function AfterStart() {
    if(isCorrect(hours, 24) && isCorrect(minutes, 60) && isCorrect(seconds, 60)) {
        PError.classList.add('isHide');
        StartTimer();
    }
}

function StartTimer() {
    let sumSeconds;
    if (PTimer.innerHTML != '') {
        let arr = PTimer.innerHTML.split(':').map(el => parseInt(el));
        sumSeconds = arr[0] * 3600 + arr[1] * 60 + arr[2];
    } else {
        sumSeconds = parseInt(hours.value) * 3600 + parseInt(minutes.value) * 60 + parseInt(seconds.value);
    }
    inputs.map(el => el.disabled = true);
    start.classList.add('isHide');
    end.classList.remove('isHide');
    timer = setInterval(function() {
        sumSeconds -= 1;
        let res = `${parseInt(sumSeconds / 3600)}:${parseInt(sumSeconds % 3600 / 60)}:${parseInt(sumSeconds % 60)}`;
        PTimer.innerHTML = res;
    }, 1000);
}

function StopTimer() {
    end.classList.add('isHide');
    start.classList.remove('isHide');
    clearInterval(timer);
}

function ClearTimer() {
    inputs.map(el => el.disabled = false);
    StopTimer();
    inputs.map(el => el.value = '');
    PTimer.innerHTML = '';
}

start.addEventListener('click', AfterStart);
end.addEventListener('click', StopTimer);
clear.addEventListener('click', ClearTimer);