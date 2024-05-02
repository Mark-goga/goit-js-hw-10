import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate;
let currentTime = null;
let itervalID = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      const timeСheck = Date.now();
      if (timeСheck > userSelectedDate.getTime()) {
          iziToast.show({title: 'Please choose a date in the future'});
          buttonEl.disabled = true;
      } else {
          buttonEl.disabled = false;
      }
    //   console.dir(selectedDates[0]);        
    //   console.log(userSelectedDate);
  },
};

const inputEl = document.querySelector("#datetime-picker");
const buttonEl = document.querySelector("[data-start]");
const spanDayEl = document.querySelector("[data-days]");
const spanHourEl = document.querySelector("[data-hours]");
const spanMinutesEl = document.querySelector("[data-minutes]");
const spanSecondsEl = document.querySelector("[data-seconds]")
buttonEl.disabled = true;
flatpickr(inputEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
function pad(value) {
  return String(value).padStart(2, '0'); // 1 -> 01 || 12 -> 12
}

buttonEl.addEventListener("click", () => {
    const intervalID = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = userSelectedDate.getTime() - currentTime;

    if (deltaTime <= 0) {
      clearInterval(intervalID); 
      buttonEl.disabled = false;
      inputEl.disabled = false;
      spanDayEl.textContent = '00';
      spanHourEl.textContent = '00';
      spanMinutesEl.textContent = '00';
      spanSecondsEl.textContent = '00';
    } else {
      const time = convertMs(deltaTime);
      const { seconds, minutes, hours, days } = time;
      spanDayEl.textContent = days;
      spanHourEl.textContent = hours;
      spanMinutesEl.textContent = minutes;
      spanSecondsEl.textContent = seconds;
    }
  }, 1000);
});
