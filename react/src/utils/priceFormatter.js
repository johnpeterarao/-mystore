export function formatPrice(amount, currency, country) {
  const localeMap = {
    AU: "en-AU",
    JP: "ja-JP"
  };

  const price = new Intl.NumberFormat(
    localeMap[country] || "en",
    {
      style: "currency",
      currency,
    }
  ).format(Number(amount));

  const priceSuffix = country == 'AU' ? 'AUD' : 'JPY'; 

  return `${price} ${priceSuffix}`
}