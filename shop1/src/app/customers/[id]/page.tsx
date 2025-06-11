import prisma from "@/lib/db";
import { cars } from "@prisma/client";

type CustomerPageProps = {
  params: {
    id: number;
  };
};

export default async function Customer({ params }: CustomerPageProps) {
  // console.log('id',context)
  const { id } = await params;
  console.log("id", id);
  const customer = await prisma.customers.findUnique({
    where: { id: id },
    include: {
      phones: true,
      cars: {
        include: {
          estimates: {
            include: { sub_estimates: true },
          },
        },
      },
    },
  });
  // console.log("customer", customer);
  console.log("car1", customer?.cars[0]);
  return (
    <div className='mx-6 px-6'>
      {customer?.first_name} {customer?.last_name}
      {customer?.cars.map((car: cars) => (
        <>
          <p key={car.id}>
            {car.year} {car.make} {car.model}{" "}
          </p>
          <p key={car.id}>Repair Orders: {car.estimates?.length}</p>
        </>
      ))}
    </div>
  );
}
