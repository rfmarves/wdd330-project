const apiKey = "9b653ff59e014f179afed4e8855753d3";
const baseUrl = "https://newsapi.org/v2/";
const topHeadlines = "top-headlines";
const everything = "everything";


export default async function getNews(topic, container) {
  const news = await getEverythingNews(topic);
  populateNewsContainer(news, container);
}


function populateNewsContainer(newsObject, container) {
  container.innerHTML = "";
  newsObject.forEach((newsItem) => {
    const newsCard = newsContainerTemplate(newsItem);
    container.appendChild(newsCard);
  });
}

export async function getEverythingNews(topic) {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const isoDate = oneWeekAgo.toISOString();
  console.log(isoDate);
  try {
    const url = `${baseUrl}${everything}?q=${topic}&searchIn=title&apiKey=${apiKey}&from=${isoDate}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error(error);
  }
}


// https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=9b653ff59e014f179afed4e8855753d3
export async function getHeadlineNews(country = "", category = "") {
    let userCountry = "";
    let userCategory = "";
    if(country != "") {
        userCountry = `country=${country}`;
    }
    if(category != "") {
        userCategory = `category=${category}`;
    }
    if(country != "" && category != "") {
        userCountry = `country=${country}&`;
    }
    try {
    const url = `${baseUrl}${topHeadlines}?${userCountry}${userCategory}&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error(error);
  }
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


// console.log(await getEverythingNews("united states"));
// console.log(await getEverythingNews("guatemala"));
// console.log(await getEverythingNews("business"));
// console.log(await getEverythingNews("technology"));
