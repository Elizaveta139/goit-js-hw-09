// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати.
// Такий таймер може використовуватися у блогах та інтернет-магазинах, сторінках реєстрації подій,
// під час технічного обслуговування тощо.

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputCalendar = document.querySelector('#datetime-picker');
const btnStartRef = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

btnStartRef.addEventListener('click', onCountdown);

//initial value
btnStartRef.disabled = true;

let msSelectedDates = null;
let idInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    // console.log(selectedDates[0].getTime());
    // console.log(new Date());
    msSelectedDates = selectedDates[0];
    if (msSelectedDates < new Date()) {
      //   return window.alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    btnStartRef.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

//ф-ція підрахунку значень
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

function timerContent({ days, hours, minutes, seconds }) {
  (daysRef.textContent = addLeadingZero(days)),
    (hoursRef.textContent = addLeadingZero(hours)),
    (minutesRef.textContent = addLeadingZero(minutes)),
    (secondsRef.textContent = addLeadingZero(seconds));
}

//перевірка дати та рендеринг різниці дат

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function onCountdown() {
  idInterval = setInterval(() => {
    const timeDiff = msSelectedDates - new Date();
    if (timeDiff <= 0) {
      clearTimeout(idInterval);
      return;
    }

    btnStartRef.disabled = true;
    inputCalendar.disabled = true;

    timerContent(convertMs(timeDiff));
  }, 1000);
}
