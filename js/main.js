// module imports
import getExchangeRates from "./forex.mjs";
import getCryptoRates from "./crypto.mjs";
import getEverythingNews from "./news.mjs";

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

// active content

// Exchange Rates and Crypto
function dashboardTemplate(headingText, base, rates) {
  const element = document.createElement("div");
  const heading = document.createElement("div");
  const title = document.createElement("span");
  title.classList.add("card-title");
  title.textContent = `${headingText}`;
  heading.appendChild(title);
  const subtitle = document.createElement("span");
  subtitle.classList.add("card-subtitle");
  subtitle.textContent = ` (per ${base.toUpperCase()})`;
  heading.appendChild(subtitle);
  element.appendChild(heading);
  const list = document.createElement("ul");
  Object.keys(rates).forEach((key) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${key}: ${rates[key]}`;
    list.appendChild(listItem);
  });
  element.appendChild(list);
  return element;
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
  element.appendChild(templateData);
  //   element.appendChild(templateData[1]);
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
  populateNewsContainer(news, container);
}

async function getUsNews(container) {
  const news = await getEverythingNews("united states");
  populateNewsContainer(news, container);
}

async function getTechNews(container) {
  const news = await getEverythingNews("technology");
  populateNewsContainer(news, container);
}

async function getFinancialNews(container) {
  const news = await getEverythingNews("business");
  populateNewsContainer(news, container);
}

function newsContainerTemplate(newsObject) {
  const newsCard = document.createElement("div");
  newsCard.classList.add("flip-card-inner");
  const newsCardFront = document.createElement("div");
  newsCardFront.classList.add("flip-card-front");
  const heading = document.createElement("h3");
  heading.textContent = newsObject.title;
  newsCardFront.appendChild(heading);
  const image = document.createElement("img");
  image.src = newsObject.urlToImage;
  image.onerror = "this.src='/img/placeholder.webp'";
  if (newsObject.urlToImage === null) {
    image.src = "/img/placeholder.webp";
  }
  image.alt = newsObject.title;
  image.classList.add("flip-card-image");
  newsCardFront.appendChild(image);
  const newsSource = document.createElement("p");
  newsSource.textContent = `Source: ${newsObject.source.name}`;
  newsCardFront.appendChild(newsSource);
  const newsText = document.createElement("p");
  newsText.textContent = newsObject.description;
  newsCardFront.appendChild(newsText);
  newsCard.appendChild(newsCardFront);
  const newsCardBack = document.createElement("div");
  newsCardBack.classList.add("flip-card-back");
  const author = document.createElement("p");
  author.textContent = `by ${newsObject.author}`;
  if (newsObject.author === null) {
    author.textContent = "by Unknown";
  }
  newsCardBack.appendChild(author);
  const publishedAt = document.createElement("p");
  publishedAt.textContent = `published at ${newsObject.publishedAt}`;
  newsCardBack.appendChild(publishedAt);
  const content = document.createElement("p");
  content.textContent = newsObject.content;
  newsCardBack.appendChild(content);
  const readMore = document.createElement("div");
  readMore.classList.add("read-more");
  const readMoreLink = document.createElement("a");
  readMoreLink.href = newsObject.url;
  readMoreLink.textContent = "Read More";
  readMoreLink.target = "_blank";
  readMore.appendChild(readMoreLink);
  newsCardBack.appendChild(readMore);
  newsCard.appendChild(newsCardBack);
  const flipCardContainer = document.createElement("div");
  flipCardContainer.classList.add("flip-card");
  flipCardContainer.appendChild(newsCard);
  return flipCardContainer;
}

function populateNewsContainer(newsObject, container) {
  container.innerHTML = "";
  newsObject.forEach((newsItem) => {
    const newsCard = newsContainerTemplate(newsItem);
    container.appendChild(newsCard);
  });
}

// initial load
// getGtNews(newsContainer);
