// import Link from "next/link";/
// import { Url } from "url";

const Card = ({
  title,
  description,
}: // href,
{
  title: string;
  description: string;
  // href: string;
}) => {
  return (
    <div className="border p-4 rounded shadow-md hover:bg-blue-200 transition-shadow duration-300">
      {/* <Link href={href}> */}
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
      {/* </Link> */}
    </div>
  );
};

export default Card;
