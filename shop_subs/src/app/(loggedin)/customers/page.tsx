import CustomerSearch from "@/app/(loggedin)/ui/customer-search";
import CustomerForm from "../ui/customer-form";
import CustomerComboBox from "../ui/customer-combobox";

export default function CustomersPage() {
  return (
    <div className='flex flex-row min-h-screen'>
      <div className='flex-1 p-4'>
        <h2 className='text-xl font-bold bg-center'>Customers</h2>
        <CustomerSearch />
      </div>
      <div className='flex-1 p-4'>
        <CustomerForm customer={null} />
      </div>
      {/* <div className='flex-1 p-4'>
        <CustomerComboBox />
      </div> */}
    </div>
  );
}
