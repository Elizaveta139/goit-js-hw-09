// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) стільки разів,
// скільки ввели в поле amount. Під час кожного виклику передай їй номер промісу (position), що створюється,
// і затримку, враховуючи першу затримку (delay), введену користувачем, і крок (step).

import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
// const BtnRef = document.querySelector('.form button');

formRef.addEventListener('submit', onButtonSubmit);

//створення проміса : номер проміса і затримка
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

//при настисканні на кпопку
function onButtonSubmit(evt) {
  evt.preventDefault();

  // const { delay, step, amount } = evt.currentTarget.elements;

  let delay = Number(formRef.delay.value);
  let step = Number(formRef.step.value);
  let amount = Number(formRef.amount.value);

  // console.log(delayEl);
  // console.log(stepEl);
  // console.log(amountEl);

  //перебираємо і викликаємо функцію для створення промісу

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }

  //   // formRef.reset();
}
