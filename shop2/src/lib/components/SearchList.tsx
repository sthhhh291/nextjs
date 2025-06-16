import SearchResult from "./SearchResult";
import Link from "next/link";

type SearchList = {
  id: number;
  title: string;
  href: string;
};

const SearchList = ({ items }: { items: SearchList[] }) => {
  return (
    <div>
      <div className="grid grid-cols-1">
        {items.map((item) => (
          <div key={item.id}>
            <Link href={item.href}>
              <SearchResult key={item.id} title={item.title} />
            </Link>
            {/* <SearchResult key={item.id} title={item.title} /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchList;
