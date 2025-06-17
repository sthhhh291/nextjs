// import Link from "next/link";
import TableRow from "./TableRow";

type TableProps = {
  title: string;
  headers: string[];
  rows: object[];
  href?: string;
};

const Table = (props: TableProps) => {
  console.log(props.rows);
  return (
    <div className="">
      <h1 className="text-sm font-bold mb-4 center">{props.title}</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {props.rows.map((row, index) => (
            <TableRow isHeading key={index} dataList={Object.keys(row)} />
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {props.rows.map((row, index) => (
            <TableRow key={index} dataList={Object.values(row)} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
