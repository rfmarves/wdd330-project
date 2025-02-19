// module imports
import getExchangeRates from "./forex.mjs";
import getCryptoRates from "./crypto.mjs";

// maing export function
export default async function populateDashboardItem(
  element,
  headingText,
  coins,
  base,
  fetchFunction
) {
  const rates = await fetchFunction(coins, base);
  const templateData = dashboardTemplate(headingText, base, rates);
  element.appendChild(templateData);
}

// Exchange Rates and Crypto Rates template
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
  const gear = document.createElement("div");
  gear.classList.add("gear");
  gear.innerHTML = '<i class="fa-solid fa-gear"></i>';
  heading.appendChild(gear);
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
