import { DateTimeConvert } from '@/src/utils/datetime';
import { DecimalFormat } from '@/src/utils/format';

import { useFutureFilterStore } from '@/src/stores/future_filter';
import { useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { Button } from '@/src/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { LoadingIcon } from '../../common/loading';
import { FutureXgbLogsFilter } from './filter';
import useFutureLogs from './hook/useLogs';

export const FutureXgbLogsComm = () => {
  const { getLogs, isLoading, lists, pagination } = useFutureLogs();
  const { page, symbol, limit, type, entry, updatePage, reload, setReload } =
    useFutureFilterStore();

  const changePageStep = (type: string) => {
    if (type === 'left' && page > 1) {
      updatePage({ page: page - 1 });
      return;
    } else if (type === 'right' && page < parseInt(pagination?.page_all)) {
      updatePage({ page: page + 1 });
      return;
    }
  };

  useEffect(() => {
    getLogs({ symbol, page, limit, type, entry });
    setReload(false);
  }, [entry, getLogs, limit, page, reload, setReload, symbol, type]);

  if (isLoading || !pagination) return <LoadingIcon />;

  return (
    <div className="pt-2">
      <div className="flex items-center justify-between gap-3 pb-3">
        <div className="shrink-0">
          <Button
            onClick={() => changePageStep('left')}
            className="btnPagination"
            variant="outline"
            size="sm"
          >
            <FaChevronLeft />
          </Button>
        </div>
        <div className="flex flex-1 flex-wrap items-center gap-2 px-2">
          <h2 className="text-lg font-semibold">
              Future Logs ({page}/{pagination?.page_all})
          </h2>
          <h2 className="text-lg font-semibold">
            Total : {DecimalFormat(pagination?.all, 0)}
          </h2>
        </div>
        <div className="shrink-0 text-right">
          <Button
            onClick={() => changePageStep('right')}
            className="btnPagination"
            variant="outline"
            size="sm"
          >
            <FaChevronRight />
          </Button>
        </div>
      </div>
      <div className="pb-3">
        <FutureXgbLogsFilter />
      </div>
      <div className="tableContainer overflow-x-auto">
        <Table className="customTable min-w-[1100px]">
          <TableHeader className="tableHead">
            <TableRow>
              <TableHead style={{ width: '50px' }}>#</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>DateTime</TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Exp Pct</TableHead>
              <TableHead>Trend</TableHead>
              <TableHead>Entry</TableHead>
              <TableHead>Adx</TableHead>
              <TableHead>RSI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lists &&
              lists.map((row, index) => {
                const body = JSON.parse(row.body_json);
                const labelExpected = ['BUY', 'SELL'].includes(body.label);
                const isHighConfidence = labelExpected;
                return (
                  <TableRow
                    key={row.timestamp}
                    className={
                      isHighConfidence ? 'tableRow xgbSignalRow' : 'tableRow'
                    }
                  >
                    <TableCell className="indexCell">
                      {(page - 1) * limit + (index + 1)}
                    </TableCell>
                    <TableCell className="symbolCell">
                      <a
                        href={`https://www.binance.com/en/futures/${row.symbol}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.symbol}
                      </a>
                    </TableCell>
                    <TableCell className="dateCell">
                      {DateTimeConvert(
                        row.timestamp as string,
                        'DD/MM/YYYY HH:mm:ss',
                      )}
                    </TableCell>
                    <TableCell className="labelCell">
                      <span
                        className={`labelBadge ${body.label.toLowerCase()}`}
                      >
                        {body.label}
                      </span>
                    </TableCell>
                    <TableCell className="confidenceCell">
                      <span
                        className={`confidenceBadge ${
                          parseFloat(body.confidence) >= 0.8 ? 'high' : 'low'
                        }`}
                      >
                        {(parseFloat(body.confidence) * 100).toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell>{body.price}</TableCell>
                    <TableCell className="returnCell">
                      <span
                        className={`returnValue ${
                          parseFloat(body.expected_future_return_pct) >= 0
                            ? 'positive'
                            : 'negative'
                        }`}
                      >
                        {parseFloat(body.expected_future_return_pct).toFixed(2)}
                        %
                      </span>
                    </TableCell>
                    <TableCell className="trendCell">{body.trend}</TableCell>
                    <TableCell className="trendCell">
                      {body.entry_type == 'None' ? (
                        '-'
                      ) : (
                        <span className={`labelBadge buy`}>
                          {body.entry_type}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="trendCell">
                      {DecimalFormat(body.adx) ?? '-'}
                    </TableCell>
                    <TableCell className="trendCell">
                      {DecimalFormat(body.rsi) ?? '-'}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between gap-3 py-3">
        <div className="shrink-0">
          <Button
            onClick={() => changePageStep('left')}
            className="btnPagination"
            variant="outline"
            size="sm"
          >
            <FaChevronLeft />
          </Button>
        </div>
        <div className="flex flex-1 flex-wrap items-center gap-2 px-2">
          <h2 className="text-lg font-semibold">
              Future Logs ({page}/{pagination?.page_all})
          </h2>
          <h2 className="text-lg font-semibold">
            Total : {DecimalFormat(pagination?.all, 0)}
          </h2>
        </div>
        <div className="shrink-0 text-right">
          <Button
            onClick={() => changePageStep('right')}
            className="btnPagination"
            variant="outline"
            size="sm"
          >
            <FaChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};
