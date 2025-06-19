import Link from "next/link";

type rowProps = {
  dataList: string[];
  isHeading?: boolean;
  link?: boolean;
  href?: string;
};

const TableRow = (props: rowProps) => {
  return (
    <tr>
      {props.link ? (
        <td colSpan={props.dataList.length}>
          <Link href={props.href ?? "#"}>{props.dataList[0]}</Link>
        </td>
      ) : (
        props.dataList.map((item, index) =>
          props.isHeading ? (
            <th className="px-2" key={index}>
              {item}
            </th>
          ) : (
            <td className="bg-slate-200" key={index}>
              {item}
            </td>
          )
        )
      )}
    </tr>
  );
};

export default TableRow;
