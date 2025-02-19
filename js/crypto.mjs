const rootUrl = "https://api.coingecko.com/api/v3/";
const defaultCoins = ["bitcoin", "ethereum", "ripple", "bitcoin-cash"];
const defaultCurrencies = ["usd", "eur", "gbp", "inr"];
const defaultCurrency = "usd";

const coinOptions = ["1inch","aave","airdao-bridged-usdc-airdao","algorand","arbitrum-bridged-wbtc-arbitrum-one","avalanche-2","basic-attention-token","binance-peg-bitcoin-cash","binance-peg-shib","bitcoin","bitcoin-cash","bittorrent","cardano","chainlink","compound-governance-token","cosmos","dash","decentraland","dogecoin","elrond-erd-2","enjincoin","ethereum","ethereum-classic","filecoin","ftx-token","havven","helium","holotoken","iostoken","kusama","litecoin","maker","monero","nem","neo","pancakeswap-token","polkadot","ravencoin","ripple","solana","stellar","tether","tezos","the-sandbox","theta-token","tron","uniswap","vechain","zcash","zilliqa"];

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
      output[key] = data[key][base];
    });
    return output;
  } catch (error) {
    console.error(error);
  }
}

// export async function getCryptoCurrencies() {}

export function getReferenceCurrencies() {
  console.log(defaultCurrencies);
  return defaultCurrencies;
}

// This function fetches the supported cryptocurrencies from the API
// There over 170 thousand, making app usage overcomplicated.
// export async function getCryptoCurrencies() {
//   try {
//     const url = `${rootUrl}coins/list`;
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);
//     const output = data.map((coin) => coin.id);
//     return output;
//   } catch (error) {
//     console.error(error);
//   }
// }

export function getCryptoCurrencies() {
  return coinOptions;
}

// console.log(await getCryptoCurrencies());

// console.log(await getCryptoRates());