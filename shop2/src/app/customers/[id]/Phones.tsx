const Phones = ({ phones }: { phones: phone[] }) => (
  <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6'>
    <div className='mb-4'>
      {phones.map((phone, index) => (
        <h2 key={index} className='text-xl font-bold text-gray-900'>
          {phone.phone_type} {phone.phone_number}
        </h2>
      ))}
    </div>
    <div></div>
  </div>
);

export default Phones;
