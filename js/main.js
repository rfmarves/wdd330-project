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

// Dashboard settings

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
const fxSettingsContainer = document.querySelector("#fx-settings");
const cryptoSettingsContainer = document.querySelector("#crypto-settings");


function changeSettings(type) {
  if (type === "fx") {
    fxModal();
  }
  if (type === "crypto") {
    cryptoModal();
  }
}

function fxModal() {
  const fxClose = document.querySelector("#fx-close");
  const fxSave = document.querySelector("#fx-save");
  const fxReferenceInput = document.querySelector("#fx-reference");
  const fx1Input = document.querySelector("#fx1");
  const fx2Input = document.querySelector("#fx2");
  const fx3Input = document.querySelector("#fx3");
  const fx4Input = document.querySelector("#fx4");
  const  currencyOptions = getCurrencies();
  fxReferenceInput.innerHTML = "";
  fx1Input.innerHTML = "";
  fx2Input.innerHTML = "";
  fx3Input.innerHTML = "";
  fx4Input.innerHTML = "";
  addOptions(fxReferenceInput, currencyOptions);
  selectAnOption(fxReferenceInput, currencyPreferences.reference);
  addOptions(fx1Input, currencyOptions);
  selectAnOption(fx1Input, currencyPreferences.currencies[0]);
  addOptions(fx2Input, currencyOptions);
  selectAnOption(fx2Input, currencyPreferences.currencies[1]);
  addOptions(fx3Input, currencyOptions);
  selectAnOption(fx3Input, currencyPreferences.currencies[2]);
  addOptions(fx4Input, currencyOptions);
  selectAnOption(fx4Input, currencyPreferences.currencies[3]);
  fxSave.addEventListener("click", () => {
    currencyPreferences.reference = fxReferenceInput.value;
    currencyPreferences.currencies = [
      fx1Input.value,
      fx2Input.value,
      fx3Input.value,
      fx4Input.value
    ];
    setLocalStorage("fnc_fx", currencyPreferences);
    fxSettingsContainer.close();
    populateExchangeRates();
  });
  fxClose.addEventListener("click", () => {
    fxSettingsContainer.close();
  });
  fxSettingsContainer.showModal();
}



function cryptoModal() {
  const referenceCurrencies = getReferenceCurrencies();
  const currencyOptions = getCryptoCurrencies();
  const cryptoClose = document.querySelector("#crypto-close");
  const cryptoSave = document.querySelector("#crypto-save");
  const cryptoReferenceInput = document.querySelector("#crypto-reference");
  const crypto1Input = document.querySelector("#crypto1");
  const crypto2Input = document.querySelector("#crypto2");
  const crypto3Input = document.querySelector("#crypto3");
  const crypto4Input = document.querySelector("#crypto4");
  cryptoReferenceInput.innerHTML = "";
  crypto1Input.innerHTML = "";
  crypto2Input.innerHTML = "";
  crypto3Input.innerHTML = "";
  crypto4Input.innerHTML = "";
  addOptions(cryptoReferenceInput, referenceCurrencies);
  selectAnOption(cryptoReferenceInput, cryptoPreferences.reference);
  addOptions(crypto1Input, currencyOptions);
  selectAnOption(crypto1Input, cryptoPreferences.currencies[0]);
  addOptions(crypto2Input, currencyOptions);
  selectAnOption(crypto2Input, cryptoPreferences.currencies[1]);
  addOptions(crypto3Input, currencyOptions);
  selectAnOption(crypto3Input, cryptoPreferences.currencies[2]);
  addOptions(crypto4Input, currencyOptions);
  selectAnOption(crypto4Input, cryptoPreferences.currencies[3]);
  cryptoSave.addEventListener("click", () => {
    cryptoPreferences.reference = cryptoReferenceInput.value;
    cryptoPreferences.currencies = [
      crypto1Input.value,
      crypto2Input.value,
      crypto3Input.value,
      crypto4Input.value
    ];
    setLocalStorage("fnc_crypto", cryptoPreferences);
    cryptoSettingsContainer.close();
    populateCryptoRates();
  });
  cryptoClose.addEventListener("click", () => {
    cryptoSettingsContainer.close();
  });  
  cryptoSettingsContainer.showModal();
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
