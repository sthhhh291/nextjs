import Table from "../Table";

type customerProps = {
  "First Name": string;
  "Last Name": string;
  href?: string;
};

const CustomerTable = ({ customers }: { customers: customerProps[] }) => {
  return <Table rows={customers} title='Customers: ' />;
};

export default CustomerTable;
