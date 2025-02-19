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

// functions to populate dashboard items
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
// const settingsClose = document.querySelector("#close-settings");
// const settingsSave = document.querySelector("#save-settings");
// const referenceInput = document.querySelector("#reference");
// const currency1Label = document.querySelector("#currency1-label");
// const currency2Label = document.querySelector("#currency2-label");
// const currency3Label = document.querySelector("#currency3-label");
// const currency4Label = document.querySelector("#currency4-label");
// const currency1Input = document.querySelector("#currency1");
// const currency2Input = document.querySelector("#currency2");
// const currency3Input = document.querySelector("#currency3");
// const currency4Input = document.querySelector("#currency4");

function changeSettings(type) {
  if (type === "fx") {
    fxModal();
  }
  if (type === "crypto") {
    cryptoModal();
  }
  settingsContainer.showModal();
  // settingsClose.addEventListener("click", () => {
  //   settingsContainer.close();
  // } );
  // settingsSave.addEventListener("click", () => {
  //   if (type === "fx") {
  //     savePreferences(currencyPreferences, "fnc_fx");
  //     populateExchangeRates();
  //     settingsSave.removeEventListener("click", () => {});
  //   };
  //   if (type === "crypto") {
  //     savePreferences(cryptoPreferences, "fnc_crypto");
  //     populateCryptoRates();
  //     settingsSave.removeEventListener("click", () => {});
  //   }
  // });
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
  const  currencyOptions = getCurrencies();
  settingsContainer.innerHTML = "";
  const header = document.createElement("h2");
  header.textContent = "Dashboard settings";
  settingsContainer.appendChild(header);
  const form = document.createElement("form");
  form.id = "dashboard-settings-form";
  const referenceLabel = document.createElement("label");
  referenceLabel.for = "reference";
  referenceLabel.id = "reference-label";
  referenceLabel.textContent = "Reference Currency:";
  form.appendChild(referenceLabel);
  const referenceInput = document.createElement("select");
  referenceInput.name = "reference";
  referenceInput.id = "reference";
  addOptions(referenceInput, currencyOptions);
  selectAnOption(referenceInput, currencyPreferences.reference);
  form.appendChild(referenceInput);
  const currency1Label = document.createElement("label");
  currency1Label.for = "currency1";
  currency1Label.id = "currency1-label";
  currency1Label.textContent = "Currency 1:";
  form.appendChild(currency1Label);
  const currency1Input = document.createElement("select");
  currency1Input.name = "currency1";
  currency1Input.id = "currency1";
  addOptions(currency1Input, currencyOptions);
  selectAnOption(currency1Input, currencyPreferences.currencies[0]);
  form.appendChild(currency1Input);
  const currency2Label = document.createElement("label");
  currency2Label.for = "currency2";
  currency2Label.id = "currency2-label";
  currency2Label.textContent = "Currency 2:";
  form.appendChild(currency2Label);
  const currency2Input = document.createElement("select");
  currency2Input.name = "currency2";
  currency2Input.id = "currency2";
  addOptions(currency2Input, currencyOptions);
  selectAnOption(currency2Input, currencyPreferences.currencies[1]);
  form.appendChild(currency2Input);
  const currency3Label = document.createElement("label");
  currency3Label.for = "currency3";
  currency3Label.id = "currency3-label";
  currency3Label.textContent = "Currency 3:";
  form.appendChild(currency3Label);
  const currency3Input = document.createElement("select");
  currency3Input.name = "currency3";
  currency3Input.id = "currency3";
  addOptions(currency3Input, currencyOptions);
  selectAnOption(currency3Input, currencyPreferences.currencies[2]);
  form.appendChild(currency3Input);
  const currency4Label = document.createElement("label");
  currency4Label.for = "currency4";
  currency4Label.id = "currency4-label";
  currency4Label.textContent = "Currency 4:";
  form.appendChild(currency4Label);
  const currency4Input = document.createElement("select");
  currency4Input.name = "currency4";
  currency4Input.id = "currency4";
  addOptions(currency4Input, currencyOptions);
  selectAnOption(currency4Input, currencyPreferences.currencies[3]);
  form.appendChild(currency4Input);
  const saveButton = document.createElement("button");
  saveButton.type = "button";
  saveButton.id = "save-settings";
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", () => {
    currencyPreferences.reference = referenceInput.value;
    currencyPreferences.currencies = [currency1Input.value, currency2Input.value, currency3Input.value, currency4Input.value];
    savePreferences(currencyPreferences, "fnc_fx");
    populateExchangeRates();
  });
  form.appendChild(saveButton);
  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.id = "close-settings";
  closeButton.textContent = "Cancel";
  closeButton.addEventListener("click", () => {
    settingsContainer.close();
  });
  form.appendChild(closeButton);
  settingsContainer.appendChild(form);
}

function cryptoModal() {
  const referenceCurrencies = getReferenceCurrencies();
  const cryptoOptions = getCryptoCurrencies();

  const  currencyOptions = getCurrencies();
  settingsContainer.innerHTML = "";
  const header = document.createElement("h2");
  header.textContent = "Dashboard settings";
  settingsContainer.appendChild(header);
  const form = document.createElement("form");
  form.id = "dashboard-settings-form";
  const referenceLabel = document.createElement("label");
  referenceLabel.for = "reference";
  referenceLabel.id = "reference-label";
  referenceLabel.textContent = "Reference Currency:";
  form.appendChild(referenceLabel);
  const referenceInput = document.createElement("select");
  referenceInput.name = "reference";
  referenceInput.id = "reference";
  addOptions(referenceInput, referenceCurrencies);
  selectAnOption(referenceInput, cryptoPreferences.reference);
  form.appendChild(referenceInput);
  const currency1Label = document.createElement("label");
  currency1Label.for = "currency1";
  currency1Label.id = "currency1-label";
  currency1Label.textContent = "Coin 1:";
  form.appendChild(currency1Label);
  const currency1Input = document.createElement("select");
  currency1Input.name = "currency1";
  currency1Input.id = "currency1";
  addOptions(currency1Input, cryptoOptions);
  selectAnOption(currency1Input, cryptoPreferences.currencies[0]);
  form.appendChild(currency1Input);
  const currency2Label = document.createElement("label");
  currency2Label.for = "currency2";
  currency2Label.id = "currency2-label";
  currency2Label.textContent = "Coin 2:";
  form.appendChild(currency2Label);
  const currency2Input = document.createElement("select");
  currency2Input.name = "currency2";
  currency2Input.id = "currency2";
  addOptions(currency2Input, cryptoOptions);
  selectAnOption(currency2Input, cryptoPreferences.currencies[1]);
  form.appendChild(currency2Input);
  const currency3Label = document.createElement("label");
  currency3Label.for = "currency3";
  currency3Label.id = "currency3-label";
  currency3Label.textContent = "Coin 3:";
  form.appendChild(currency3Label);
  const currency3Input = document.createElement("select");
  currency3Input.name = "currency3";
  currency3Input.id = "currency3";
  addOptions(currency3Input, cryptoOptions);
  selectAnOption(currency3Input, cryptoPreferences.currencies[2]);
  form.appendChild(currency3Input);
  const currency4Label = document.createElement("label");
  currency4Label.for = "currency4";
  currency4Label.id = "currency4-label";
  currency4Label.textContent = "Coin 4:";
  form.appendChild(currency4Label);
  const currency4Input = document.createElement("select");
  currency4Input.name = "currency4";
  currency4Input.id = "currency4";
  addOptions(currency4Input, cryptoOptions);
  selectAnOption(currency4Input, cryptoPreferences.currencies[3]);
  form.appendChild(currency4Input);
  const saveButton = document.createElement("button");
  saveButton.type = "button";
  saveButton.id = "save-settings";
  saveButton.textContent = "Save";
  form.appendChild(saveButton);
  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.id = "close-settings";
  closeButton.textContent = "Cancel";
  form.appendChild(closeButton);
  settingsContainer.appendChild(form);
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
