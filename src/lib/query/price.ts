import axios from "axios";

const getPriceBinance = async (symbol: string) => {
  const API_KEY = process.env.BINANCE_API_KEY;

  const BASE_URL = "https://api.binance.com";
  const endpoint = "/api/v3/ticker";

  const url = `${BASE_URL}${endpoint}/price?symbol=${symbol}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "X-MBX-APIKEY": API_KEY,
      },
    });

    return response.data.price;
  } catch (error) {
    console.log("ERROR >>>>>>", error.message);
    return null;
  }
};

const getByBitPrice = async (symbol: string) => {
  const BASE_URL =
    "https://api.bybit.com/v5/market/tickers?category=spot&symbol=";

  const url = `${BASE_URL}${symbol}`;

  try {
    const response = await axios.get(url);
    return response.data.result.list[0];
  } catch (error) {
    console.log("ERROR >>>>>>", error.message);
    return null;
  }
};

const getFinnHub = async (symbol: string) => {
  const token = process.env.FINNHUB_API_KEY;
  const symbolWrap = symbol.slice(0, -1);
  const url = `https://finnhub.io/api/v1/quote?symbol=${symbolWrap}&token=${token}`;
  try {
    const response = await axios.get(url);
    return {
      symbol,
      price: response.data.c,
    };
  } catch (error) {
    console.log("ERROR >>>>>>", error.message);
    return null;
  }
};
export { getPriceBinance, getByBitPrice, getFinnHub };
