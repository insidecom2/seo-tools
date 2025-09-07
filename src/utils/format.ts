const CurrencyFormat = (val: number, format: string = "en-US") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(val);
};

const DecimalFormat = (val: number, decimal: number = 2) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  }).format(val);
};

export { CurrencyFormat, DecimalFormat };
