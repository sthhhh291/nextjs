const Heading = ({ title }: { title: string }) => {
  return (
    <div className='border p-4 rounded shadow-md hover:bg-blue-200 transition-shadow duration-300'>
      <h2 className='text-7xl font-bold mb-2'>{title}</h2>
    </div>
  );
};

export default Heading;
