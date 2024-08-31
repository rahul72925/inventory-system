const priceCurrencyRemover = (string) => +string.replace("$", "").trim();

const priceWithCurrency = (price) => `${price}`;

export { priceCurrencyRemover, priceWithCurrency };
