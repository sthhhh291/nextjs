import React from "react";

type TableProps<T> = {
  data: T[];
  columns: {
    key: keyof T;
    header: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
  }[];
  keyField: keyof T;
  className?: string;
};

function Table<T>({ data, columns, keyField }: TableProps<T>) {
  console.log("data", data, "columns", columns, "keyfield", keyField);
  return (
    <table className='table-auto w-full text-left border'>
      <thead>
        <tr className='bg-slate-300'>
          {columns.map((col) => (
            <th key={String(col.key)}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr className='striped' key={String(row[keyField])}>
            {columns.map((col) => (
              <td key={String(col.key)}>
                {col.render
                  ? col.render(row[col.key], row)
                  : String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
