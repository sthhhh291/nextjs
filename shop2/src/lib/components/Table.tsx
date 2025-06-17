// import Link from "next/link";
import TableRow from "./TableRow";

type TableRow = {
  href?: string;
  [key: string]: any;
};

type TableProps = {
  title: string;
  rows: TableRow[];
  href?: string;
};

const Table = (props: TableProps) => {
  console.log(props.rows);
  console.log("header rows", Object.keys(props.rows[0]));
  console.log("href", props.rows[0].href);
  return (
    <div className=''>
      <h1 className='text-sm font-bold mb-4 center'>{props.title}</h1>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <TableRow isHeading dataList={Object.keys(props.rows[0])} />
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {props.rows.map((row, index) => (
            <TableRow
              key={index}
              dataList={Object.values(row)}
              href={row.href}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
