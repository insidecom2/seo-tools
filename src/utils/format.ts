const CurrencyFormat = (val: number, format: string = "en-US") => {
  if (val === null || val === undefined) return "-";
  return new Intl.NumberFormat(format, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(val);
};

const DecimalFormat = (val: number, decimal: number = 2) => {
  if (val === null || val === undefined) return "-";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  }).format(val);
};

export { CurrencyFormat, DecimalFormat };
