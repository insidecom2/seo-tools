import { IObject } from "@/src/interface/object";
import { DateTimeConvert } from "@/src/utils/datetime";
import { CurrencyFormat } from "@/src/utils/format";
import { Table } from "react-bootstrap";

export const TableLists = ({ currentData }: { currentData: IObject[] }) => {
  const redIncome = (val: number) => {
    return <span className="incomeValue negative">{CurrencyFormat(val)}</span>;
  };
  const greenIncome = (val: number) => {
    return <span className="incomeValue positive">{CurrencyFormat(val)}</span>;
  };

  return (
    <div className="pt-2">
      <div className="tableContainer">
        <Table striped bordered hover responsive className="customTable">
          <thead className="tableHead">
            <tr>
              <th style={{ width: "50px" }}>#</th>
              <th>Symbol</th>
              <th>DateTime</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {currentData &&
              currentData.map((row, index) => (
                <tr key={row.time} className="tableRow">
                  <td className="indexCell">{index + 1}</td>
                  <td className="symbolCell">{row.symbol}</td>
                  <td className="dateCell">
                    {DateTimeConvert(row.time as string, "DD/MM/YYYY HH:mm:ss")}
                  </td>
                  <td className="valueCell">
                    {parseFloat(row.totalIncome as string) > 0
                      ? greenIncome(parseFloat(row.totalIncome as string))
                      : redIncome(parseFloat(row.totalIncome as string))}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
