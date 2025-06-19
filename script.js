const currencyList = ["USD", "EUR", "INR", "GBP", "AUD", "CAD", "JPY", "CNY"];

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");

currencyList.forEach(currency => {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");
  option1.value = option2.value = currency;
  option1.text = option2.text = currency;
  fromCurrency.appendChild(option1);
  toCurrency.appendChild(option2);
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const resultDiv = document.getElementById("result");

  if (amount === "" || isNaN(amount)) {
    resultDiv.innerText = "Please enter a valid amount.";
    return;
  }

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await response.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);
    resultDiv.innerText = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    resultDiv.innerText = "Error fetching exchange rates.";
    console.error(error);
  }
}
