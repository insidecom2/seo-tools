import { IObject } from "@/src/interface/object";
import { DateTimeConvert } from "@/src/utils/datetime";
import { CurrencyFormat } from "@/src/utils/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

export const TableLists = ({ currentData }: { currentData: IObject[] }) => {
  const redIncome = (val: number) => {
    return <span className="incomeValue negative">{CurrencyFormat(val)}</span>;
  };
  const greenIncome = (val: number) => {
    return <span className="incomeValue positive">{CurrencyFormat(val)}</span>;
  };

  return (
    <div className="pt-2">
      <div className="tableContainer overflow-x-auto">
        <Table className="customTable min-w-[640px]">
          <TableHeader className="tableHead">
            <TableRow>
              <TableHead style={{ width: "50px" }}>#</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>DateTime</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData &&
              currentData.map((row, index) => (
                <TableRow key={row.time} className="tableRow">
                  <TableCell className="indexCell">{index + 1}</TableCell>
                  <TableCell className="symbolCell">{row.symbol}</TableCell>
                  <TableCell className="dateCell">
                    {DateTimeConvert(row.time as string, "DD/MM/YYYY HH:mm:ss")}
                  </TableCell>
                  <TableCell className="valueCell">
                    {parseFloat(row.totalIncome as string) > 0
                      ? greenIncome(parseFloat(row.totalIncome as string))
                      : redIncome(parseFloat(row.totalIncome as string))}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
