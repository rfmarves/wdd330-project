const rootUrl = "https://api.coingecko.com/api/v3/";
const defaultCoins = ["bitcoin", "ethereum", "ripple", "bitcoin-cash"];
const baseCurrency = "usd";
// API data provided by CoinGecko
// https://www.coingecko.com/en/api/documentation
// https://docs.coingecko.com/v3.0.1/reference/simple-price


export default async function getCryptoRates(coins = defaultCoins, base = baseCurrency) {
  try {
    const url = `${rootUrl}simple/price?ids=${coins.join(",")}&vs_currencies=${base}`;
    const response = await fetch(url);
    const data = await response.json();
    let output = {};
    Object.keys(data).forEach(key => {
        output[key] = data[key].usd;
    });
    return output;
  } catch (error) {
    console.error(error);
  }
}

// console.log(await getCryptoRates());