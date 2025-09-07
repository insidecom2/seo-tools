import { IObject } from "@/src/interface/object";
import { Table } from "react-bootstrap";
import { CurrencyFormat } from "@/src/utils/format";
import { DateTimeConvert } from "@/src/utils/datetime";

export const TableLists = ({ currentData }: { currentData: IObject[] }) => {
  const redIncome = (val: number) => {
    return <div className="text-danger">{CurrencyFormat(val)}</div>;
  };
  const greenIncome = (val: number) => {
    return <div className="text-success">{CurrencyFormat(val)}</div>;
  };

  return (
    <div className="pt-2">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Symbol</th>
            <th>DateTime</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {currentData &&
            currentData.map((row, index) => (
              <tr key={row.time}>
                <td>{index + 1}</td>
                <td>{row.symbol}</td>
                <td>
                  {DateTimeConvert(row.time as string, "DD/MM/YYYY H:mm:ss")}
                </td>
                <td>
                  {parseFloat(row.totalIncome as string) > 0
                    ? greenIncome(parseFloat(row.totalIncome as string))
                    : redIncome(parseFloat(row.totalIncome as string))}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {/* <Pagination>
        <Pagination.Item key={1} active={1 === 1}>
          1
        </Pagination.Item>
      </Pagination> */}
    </div>
  );
};
