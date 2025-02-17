const apiKey = "9b653ff59e014f179afed4e8855753d3";
const baseUrl = "https://newsapi.org/v2/";
const topHeadlines = "top-headlines";
const everything = "everything";

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

export default async function getEverythingNews(topic) {
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

// console.log(await getEverythingNews("united states"));
// console.log(await getEverythingNews("guatemala"));
// console.log(await getEverythingNews("business"));
// console.log(await getEverythingNews("technology"));
