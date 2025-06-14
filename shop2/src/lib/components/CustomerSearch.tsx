import Input from "./Input";
import Pagination from "./Pagination";

const CustomerSearch = () => {
  return (
    <div>
      <Input placeholder='Search customers...' value='' />
      <Pagination
        total={0}
        currentPage={0}
        pageSize={0}
        onPageChange={function (page: number): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default CustomerSearch;
