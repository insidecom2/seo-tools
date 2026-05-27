import { BinanceSetting } from "@/src/components/binance/config/Setting";
import NavbarTop from "@/src/components/nav";

const BinanceConfig = () => {
  return (
    <div>
      <NavbarTop />
      <main className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-8">
        <div className="mx-auto w-full max-w-5xl">
          <BinanceSetting />
        </div>
      </main>
    </div>
  );
};

export default BinanceConfig;
