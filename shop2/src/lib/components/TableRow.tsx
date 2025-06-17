import Link from "next/link";

type rowProps = {
  dataList: string[];
  href?: string;
  isHeading?: boolean;
};

const TableRow = (props: rowProps) => {
  return (
    <tr className='bg-slate-200 hover:bg-slate-500'>
      {props.dataList.map((item, index) =>
        props.isHeading ? (
          <th className='px-2' key={index}>
            {item}
          </th>
        ) : // if href make a clickable link
        props.href ? (
          <Link href={props.href}>
            <td key={index}>{item}</td>
          </Link>
        ) : (
          <td key={index}>{item}</td>
        )
      )}
    </tr>
  );
};

export default TableRow;
