import Binance from "binance-api-node";
const binanceConnection = () => {
  const client = Binance({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRET,
  });

  return client;
};

export { binanceConnection };
