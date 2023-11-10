import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysOutput = document.querySelector('[data-days]');
const hoursOutput = document.querySelector('[data-hours]');
const minutesOutput = document.querySelector('[data-minutes]');
const secondsOutput = document.querySelector('[data-seconds]');

let userDate = '';
const currentDate = new Date();

startButton.setAttribute('disabled', true);

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userDate = selectedDates[0];
    let diff = userDate - currentDate;
    if (diff < 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startButton.removeAttribute('disabled');
      startButton.addEventListener('click', () => {
        const interval = setInterval(() => {
          countDifference(diff);
          diff -= 1000;
          if (diff < 0) {
            clearInterval(interval);
            return;
          }
        }, 1000);
        startButton.setAttribute('disabled', true);
      });
    }
  },
});

function countDifference(diff) {
  const { days, hours, minutes, seconds } = getTimeComponents(diff);
  daysOutput.textContent = addLeadingZero(days);
  hoursOutput.textContent = addLeadingZero(hours);
  minutesOutput.textContent = addLeadingZero(minutes);
  secondsOutput.textContent = addLeadingZero(seconds);
}

function getTimeComponents(diff) {
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);
  const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function addLeadingZero(arg) {
  arg = arg.toString();
  if (arg.length < 3) {
    return arg.padStart(2, '0');
  }
  return arg;
}