const rootUrl = "https://api.coingecko.com/api/v3/";
const defaultCoins = ["bitcoin", "ethereum", "ripple", "bitcoin-cash"];
const defaultCurrencies = ["usd", "eur", "gbp", "inr"];
const defaultCurrency = "usd";

// API data provided by CoinGecko
// https://www.coingecko.com/en/api/documentation
// https://docs.coingecko.com/v3.0.1/reference/simple-price

// https://api.coingecko.com/api/v3/simple/supported_vs_currencies
// https://api.coingecko.com/api/v3/coins/list

export default async function getCryptoRates(
  coins = defaultCoins,
  base = defaultCurrency
) {
  try {
    const url = `${rootUrl}simple/price?ids=${coins.join(
      ","
    )}&vs_currencies=${base}`;
    const response = await fetch(url);
    const data = await response.json();
    let output = {};
    Object.keys(data).forEach((key) => {
      output[key] = data[key].usd;
    });
    return output;
  } catch (error) {
    console.error(error);
  }
}

// export async function getCryptoCurrencies() {}

export function getReferenceCurrencies() {
  return defaultCurrencies;
}

// console.log(await getCryptoRates());