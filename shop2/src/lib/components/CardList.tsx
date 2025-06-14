import Card from "./Card";

type Card = {
  id: number;
  title: string;
  description: string;
};

const CardList = ({ items }: { items: Card[] }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {items.map((item) => (
        <Card key={item.id} title={item.title} description={item.description} />
      ))}
    </div>
  );
};

export default CardList;
