// module imports
import getExchangeRates from "./forex.mjs";
import getCryptoRates from "./crypto.mjs";
import getNews from "./news.mjs";
import populateDashboardItem from "./dashboard.mjs";
import { getLocalStorage, setLocalStorage } from "./localstorage.mjs";

// control elements
const collapsingButton = document.querySelector("button.collapsible-button");
const financialNewsButton = document.querySelector("#financial-news");
const techNewsButton = document.querySelector("#tech-news");
const gtNewsButton = document.querySelector("#gt-news");
const usNewsButton = document.querySelector("#us-news");

// containers
const collapsibleContainer = document.querySelector(".collapsible-container");
const collapsingSymbol = document.querySelector(".collapsing-symbol");
const newsContainer = document.querySelector("#news");
// const worldTimeContainer = document.querySelector('#world-time');
const fxRatesContainer = document.querySelector("#fx-rates");
const cryptoContainer = document.querySelector("#crypto-rates");

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
  newsContainer.classList.remove("hidden");
}

// event listeners
collapsingButton.addEventListener("click", () => {
  collapsingSymbol.classList.toggle("collapsed");
  collapsibleContainer.classList.toggle("hidden");
});

financialNewsButton.addEventListener("click", () => {
  activateButton(financialNewsButton);
  getNews("business", newsContainer);
});
techNewsButton.addEventListener("click", () => {
  activateButton(techNewsButton);
  getNews("technology", newsContainer);
});
gtNewsButton.addEventListener("click", () => {
  activateButton(gtNewsButton);
  getNews("guatemala", newsContainer);
});
usNewsButton.addEventListener("click", () => {
  activateButton(usNewsButton);
  getNews("united states", newsContainer);
});

// active content load
await populateDashboardItem(
  fxRatesContainer,
  "Exchange Rates",
  ["GTQ", "EUR", "GBP", "INR"],
  "USD",
  getExchangeRates
);

await populateDashboardItem(
  cryptoContainer,
  "Crypto Rates",
  ["bitcoin", "ethereum", "ripple", "bitcoin-cash"],
  "usd",
  getCryptoRates
);
