import { FutureXgbLogsComm } from "@/src/components/binance/future_xgb_log";
import NavbarTop from "@/src/components/nav";

const FutureLogs = () => {
  return (
    <div>
      <NavbarTop />
      <main className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6">
        <FutureXgbLogsComm />
      </main>
    </div>
  );
};

export default FutureLogs;
