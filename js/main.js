// control elements
const collapsingButton = document.querySelector('button.collapsible-button');
const financialNewsButton = document.querySelector('#financial-news');
const techNewsButton = document.querySelector('#tech-news');
const gtNewsButton = document.querySelector('#gt-news');
const usNewsButton = document.querySelector('#us-news');

// containers
const collapsibleContainer = document.querySelector('.collapsible-container');
const collapsingSymbol = document.querySelector('.collapsing-symbol');
const newsContainer = document.querySelector('#news');
const worldTimeContainer = document.querySelector('#world-time');
const fxRatesContainer = document.querySelector('#fx-rates');
const cryptoContainer = document.querySelector('#crypto-rates');

// event handling functions
function inactivateButtons() {
    financialNewsButton.classList.remove("active");
    techNewsButton.classList.remove("active");
    gtNewsButton.classList.remove("active");
    usNewsButton.classList.remove("active");
}

function activateButton(buttonObject) {
    inactivateButtons();
    buttonObject.classList.add("active");
}

// event listeners
collapsingButton.addEventListener('click', () => {
  collapsingSymbol.classList.toggle('collapsed');
  collapsibleContainer.classList.toggle('hidden');
});

financialNewsButton.addEventListener('click', () => {
    activateButton(financialNewsButton);})
techNewsButton.addEventListener('click', () => {
    activateButton(techNewsButton);})
gtNewsButton.addEventListener('click', () => {
    activateButton(gtNewsButton);})
usNewsButton.addEventListener('click', () => {
    activateButton(usNewsButton);})
