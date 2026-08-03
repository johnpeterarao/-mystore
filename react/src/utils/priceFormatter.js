export function formatPrice(amount, currency) {
  const localeMap = {
    AU: "en-AU",
    JP: "ja-JP"
  };

  const price = new Intl.NumberFormat(
    localeMap[window.selectedCountry] || "en",
    {
      style: "currency",
      currency,
    }
  ).format(Number(amount));

  const priceSuffix = window.selectedCountry == 'AU' ? 'AUD' : 'JPY'; 

  return `${price} ${priceSuffix}`
}