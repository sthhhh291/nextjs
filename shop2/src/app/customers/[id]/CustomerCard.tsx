const CustomerCard = ({
  customer,
  phones,
}: {
  customer: customer;
  phones: phone[];
}) => (
  <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6'>
    <div className='mb-4'>
      <h2 className='text-xl font-bold text-gray-900'>
        {customer.first_name} {customer.last_name}
      </h2>
      <p className='text-gray-600'>{customer.notes}</p>
      {phones.map((phone, index) => (
        <p key={index} className='text-gray-600'>
          {phone.phone_type} {phone.phone_number}
        </p>
      ))}
    </div>
    <div></div>
  </div>
);

export default CustomerCard;
