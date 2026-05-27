import BinanceHistoryComm from "@/src/components/binance/history";
import NavbarTop from "@/src/components/nav";

const BinanceHistory = () => {
  return (
    <div>
      <NavbarTop />
      <main className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-8">
        <div className="mx-auto w-full max-w-5xl">
          <BinanceHistoryComm />
        </div>
      </main>
    </div>
  );
};

export default BinanceHistory;
