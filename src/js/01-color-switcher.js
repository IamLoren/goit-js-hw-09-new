
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

  let interval;
  startButton.addEventListener('click', () => {
    startButton.setAttribute('disabled', true);
     interval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
  });

  stopButton.addEventListener('click', () => {
    startButton.removeAttribute('disabled');
    clearInterval(interval);
  })