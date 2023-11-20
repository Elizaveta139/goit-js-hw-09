// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення,
// використовуючи інлайн стиль. Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStart.addEventListener('click', onBtnStartChangeColor);
btnStop.addEventListener('click', onBtnStopChangeColor);

btnStop.disabled = true;

let idInterval = null;

//кнопка Start
function onBtnStartChangeColor(evt) {
  btnDisabled();
  idInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  console.log('Click start');
}

//кнопка Stop
function onBtnStopChangeColor(evt) {
  clearInterval(idInterval);
  console.log('Click stop');
  btnDisabled();
}

//активна/неактивна кнопка
function btnDisabled() {
  if (!btnStart.disabled) {
    btnStart.disabled = true;
    btnStop.disabled = false;
  } else {
    btnStart.disabled = false;
    btnStop.disabled = true;
  }
}

//генерування випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
