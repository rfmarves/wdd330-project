// module imports
import getExchangeRates, { getCurrencies } from "./forex.mjs";
import getCryptoRates, {getReferenceCurrencies, getCryptoCurrencies } from "./crypto.mjs";
import getNews from "./news.mjs";
import populateDashboardItem from "./dashboard.mjs";
import { getLocalStorage, setLocalStorage } from "./localstorage.mjs";

// Default values
const defaultCoins = {
  "reference" : "usd",
  "currencies" : ["bitcoin", "bitcoin-cash", "ethereum", "ripple"]
};
const defaultCurrencies = {
  "reference" : "USD",
  "currencies" : ["GTQ", "EUR", "GBP", "INR"]
};

// Get user preferences
const currencyPreferences = getLocalStorage("fnc_fx") || defaultCurrencies;
const cryptoPreferences = getLocalStorage("fnc_crypto") || defaultCoins;

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
const fxRatesContainer = document.querySelector("#fx-rates");
const cryptoContainer = document.querySelector("#crypto-rates");
const settingsContainer = document.querySelector("#dashboard-settings");

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

async function populateExchangeRates() {
  await populateDashboardItem(
    fxRatesContainer,
    "fx",
    currencyPreferences.currencies,
    currencyPreferences.reference,
    getExchangeRates,
    changeSettings
  );    
}

async function populateCryptoRates() {
  await populateDashboardItem(
    cryptoContainer,
    "crypto",
    cryptoPreferences.currencies,
    cryptoPreferences.reference,
    getCryptoRates,
    changeSettings
  );
}
// settings elements
const settingsClose = document.querySelector("#close-settings");
const settingsSave = document.querySelector("#save-settings");
const referenceInput = document.querySelector("#reference");
const currency1Label = document.querySelector("#currency1-label");
const currency2Label = document.querySelector("#currency2-label");
const currency3Label = document.querySelector("#currency3-label");
const currency4Label = document.querySelector("#currency4-label");
const currency1Input = document.querySelector("#currency1");
const currency2Input = document.querySelector("#currency2");
const currency3Input = document.querySelector("#currency3");
const currency4Input = document.querySelector("#currency4");

function changeSettings(type) {
  if (type === "fx") {
    fxModal();
  }
  if (type === "crypto") {
    cryptoModal();
  }
  settingsContainer.showModal();
  settingsClose.addEventListener("click", () => {
    settingsContainer.close();
  } );
  settingsSave.removeEventListener("click", () => {});
  if (type === "fx") {
      settingsSave.addEventListener("click", () => {
        savePreferences(currencyPreferences, "fnc_fx");
        populateExchangeRates();
  })};
  if (type === "crypto") {
    settingsSave.addEventListener("click", () => {
      savePreferences(cryptoPreferences, "fnc_crypto");
      populateCryptoRates();
  })};
}

function savePreferences(preferencesVariable, key) {
    preferencesVariable.reference = referenceInput.value;
    preferencesVariable.currencies = [
      currency1Input.value,
      currency2Input.value,
      currency3Input.value,
      currency4Input.value
    ];
  setLocalStorage(key, preferencesVariable);
  settingsContainer.close();
};

function fxModal() {
  currency1Label.textContent = "Currency 1:";
  currency2Label.textContent = "Currency 2:";
  currency3Label.textContent = "Currency 3:";
  currency4Label.textContent = "Currency 4:";
  const  currencyOptions = getCurrencies();
  setModalOptions(currencyPreferences, currencyOptions, currencyOptions);
}

function cryptoModal() {
  currency1Label.textContent = "Coin 1:";
  currency2Label.textContent = "Coin 2:";
  currency3Label.textContent = "Coin 3:";
  currency4Label.textContent = "Coin 4:";
  const referenceCurrencies = getReferenceCurrencies();
  const currencyOptions = getCryptoCurrencies();
  setModalOptions(cryptoPreferences, referenceCurrencies, currencyOptions);
}

function setModalOptions(preferenceVariable, referenceCurrencies, currencyOptions) {
  addOptions(referenceInput, referenceCurrencies);
  selectAnOption(referenceInput, preferenceVariable.reference);
  addOptions(currency1Input, currencyOptions);
  selectAnOption(currency1Input, preferenceVariable.currencies[0]);
  addOptions(currency2Input, currencyOptions);
  selectAnOption(currency2Input, preferenceVariable.currencies[1]);
  addOptions(currency3Input, currencyOptions);
  selectAnOption(currency3Input, preferenceVariable.currencies[2]);
  addOptions(currency4Input, currencyOptions);
  selectAnOption(currency4Input, preferenceVariable.currencies[3]);
}

function addOptions(selectElement, optionsArray) {
  selectElement.innerHTML = "";
  optionsArray.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    selectElement.appendChild(optionElement);
  });
}

function selectAnOption(selectElement, optionValue) {
  const optionToSelect = selectElement.querySelector(`option[value="${optionValue}"]`); // Replace 'optionValue' with the actual value
  if (optionToSelect) {
      optionToSelect.selected = true;
  }
}

// active content load
populateExchangeRates();
populateCryptoRates();
