const SearchResult = ({ title }: { title: string }) => {
  return (
    <div className="px-2 border rounded shadow-md hover:bg-blue-200 transition-shadow duration-300">
      <h2 className="text-sm-font-bold">{title}</h2>
    </div>
  );
};

export default SearchResult;
