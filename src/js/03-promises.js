import Notiflix from 'notiflix';

const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const submitButton = document.querySelector('[type="submit"]');

submitButton.setAttribute('disabled', true);

form.addEventListener('input', () => {
  const inputsValues = [...inputs].some(input => input.value === '');
  if (inputsValues) {
    submitButton.setAttribute('disabled', true);
  } else if (!inputsValues) {
    submitButton.removeAttribute('disabled');
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const delayInput = [...inputs].find(input => input.getAttribute('name') === 'delay');
  const stepInput = [...inputs].find(input => input.getAttribute('name') === 'step');
  const amountInput = [...inputs].find(input => input.getAttribute('name') === 'amount');

  let delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  for (let i = 1; i <= amount; i +=1) {
    createPromise(i, delay); 
    delay += step;
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
    resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    reject(`❌ Rejected promise ${position} in ${delay}ms`);
  }
  }).then(arr => {
    setTimeout(() => {
      Notiflix.Notify.success(arr);
    }, delay)
  } )
  .catch((arr) => {
    setTimeout(() => {
      Notiflix.Notify.failure(arr);
    }, delay)
  }); 
}
