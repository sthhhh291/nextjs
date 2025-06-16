import Link from "next/link";
import Card from "./Card";

type Card = {
  id: number;
  title: string;
  description: string;
  href?: string;
};

const CardList = ({ items }: { items: Card[] }) => {
  return (
    <>
      {items.map((item) => (
        <div key={item.id}>
          {item.href ? (
            <Link href={item.href}>
              <Card
                key={item.id}
                title={item.title}
                description={item.description}
              />
            </Link>
          ) : (
            <Card title={item.title} description={item.description} />
          )}
        </div>
      ))}
    </>
  );
};

export default CardList;
