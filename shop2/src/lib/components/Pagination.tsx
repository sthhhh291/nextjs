type PaginationProps = {
  total: number;
  per_page: number;
  page: number;
  next_page: number;
  prev_page: number;
  pages: number;
};

const Pagination = (props: PaginationProps) => {
  return (
    <div className="flex justify-center mt-4">
      <nav className="flex space-x-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {props.prev_page}
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {props.next_page}
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {props.}
        </button>
      </nav>
    </div>
  );
};
export default Pagination;
