const input = document.querySelector('#datetime-picker');

const timer = document.querySelector('.timer');
const startBtn = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');
startBtn.disabled = true;

// Стилі для відображення таймера на сторінці
timer.style.display = 'flex';
timer.style.gap = '15px';
timer.style.marginTop = '20px';
const fields = document.querySelectorAll('.field');

fields.forEach(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.alignItems = 'center';
});
const values = document.querySelectorAll('.value');

values.forEach(value => {
  value.style.fontSize = '30px';
});
const label = document.querySelectorAll('.label');
label.forEach(lab => {
  lab.style.fontSize = '12px';
});

// тепер бібліотека (скопіювала з домашки)
// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// додаю бібліотеку для alert-ів...
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// ініціалізую бубліотеку на #datetime-picker; options взяла з домашки...
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        // title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
});
let userSelectedDate = null;
let countdownInterval = null;

// чіпляю слухача на кнопку
startBtn.addEventListener('click', startTimerCont);

function startTimerCont() {
  startBtn.disabled = true;
  input.disabled = true;

  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeRemaining = userSelectedDate - now;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      daysSpan.textContent = '00';
      hoursSpan.textContent = '00';
      minutesSpan.textContent = '00';
      secondsSpan.textContent = '00';

      input.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeRemaining);

    daysSpan.textContent = addZerroToTimer(days);
    hoursSpan.textContent = addZerroToTimer(hours);
    minutesSpan.textContent = addZerroToTimer(minutes);
    secondsSpan.textContent = addZerroToTimer(seconds);
  }, 1000);
}

// функція обробки часу із домашки:
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addZerroToTimer(time) {
  return String(time).padStart(2, '0');
}
