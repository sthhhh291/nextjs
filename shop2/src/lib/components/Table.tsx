import Link from "next/link";

type TableProps = {
  title: string;
  headers: string[];
  rows: string[][];
  href?: string;
};

const Table = (props: TableProps) => {
  return (
    <div className="">
      <h1 className="text-sm font-bold mb-4 center">{props.title}</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {props.headers.map((header, index) => (
              <th
                key={index}
                className="px-2 py-1 text-left text-base font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {props.href
            ? props.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-2 py-1 whitespace-nowrap text-sm text-gray-700"
                    >
                      <Link href={`${props.href}/${cell}`}>{cell}</Link>
                    </td>
                  ))}
                </tr>
              ))
            : props.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-2 py-1 whitespace-nowrap text-sm text-gray-700"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
