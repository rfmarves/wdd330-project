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
// const worldTimeContainer = document.querySelector('#world-time');
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
    newsContainer.classList.remove("hidden");
}

// event listeners
collapsingButton.addEventListener('click', () => {
  collapsingSymbol.classList.toggle('collapsed');
  collapsibleContainer.classList.toggle('hidden');
});

financialNewsButton.addEventListener("click", () => {
  activateButton(financialNewsButton);
  getFinancialNews(newsContainer);
});
techNewsButton.addEventListener("click", () => {
  activateButton(techNewsButton);
  getTechNews(newsContainer);
});
gtNewsButton.addEventListener("click", () => {
  activateButton(gtNewsButton);
  getGtNews(newsContainer);
});
usNewsButton.addEventListener("click", () => {
  activateButton(usNewsButton);
  getUsNews(newsContainer);
});

// module imports
import getExchangeRates from "/js/forex.mjs";
import getCryptoRates from "/js/crypto.mjs";
import getEverythingNews from "./news.mjs";

// active content

// Exchange Rates and Crypto
function dashboardTemplate(headingText, base, rates) {
  const heading = document.createElement("h2");
  heading.textContent = `${headingText} (per ${base.toUpperCase()})`;
  const list = document.createElement("ul");
  Object.keys(rates).forEach((key) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${key}: ${rates[key]}`;
    list.appendChild(listItem);
  });
  return [heading, list];
}

async function populateDashboardItem(
  element,
  headingText,
  coins,
  base,
  fetchFunction
) {
  const rates = await fetchFunction(coins, base);
  const templateData = dashboardTemplate(headingText, base, rates);
  element.appendChild(templateData[0]);
  element.appendChild(templateData[1]);
}

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

// news
async function getGtNews(container) {
  const news = await getEverythingNews("guatemala");
  console.log(news);
  populateNewsContainer(news, container)
}

async function getUsNews(container) {  
  const news = await getEverythingNews("united states");
  populateNewsContainer(news, container)
}

async function getTechNews(container) {
  const news = await getEverythingNews("technology");
  populateNewsContainer(news, container)
}

async function getFinancialNews(container) {
  const news = await getEverythingNews("business");
  populateNewsContainer(news, container)
}

function newsContainerTemplate(newsObject) {
    console.log(newsObject);
    const newsCard = document.createElement("div");
    newsCard.classList.add("news-card");
    const heading = document.createElement("h3");
    heading.innerHTML = `<a href=${newsObject.url}>${newsObject.title}</a>`;
    const newsText = document.createElement("p");
    newsText.textContent = newsObject.description;
    newsCard.appendChild(heading);
    newsCard.appendChild(newsText);
    return newsCard;
}

function populateNewsContainer(newsObject, container) {
    container.innerHTML = "";
    newsObject.forEach((newsItem) => {
        console.log(newsItem);
        const newsCard = newsContainerTemplate(newsItem);
        console.log(newsCard);
        container.appendChild(newsCard);
    });
}

// initial load
// getGtNews(newsContainer);
