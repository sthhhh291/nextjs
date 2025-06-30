type params = {
  id: number;
};
export default async function CarsPage({ params }: { params: params }) {
  const { id } = await params;
  return (
    <>
      <p>customer no {id}</p>
    </>
  );
}
