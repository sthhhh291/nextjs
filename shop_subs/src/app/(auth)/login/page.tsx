// import Login from "../ui/login";
import Login from "@/app/(auth)/login/login";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ from?: string | string[] }>;
}) {
  const { from } = await searchParams;
  return (
    <div className='flex flex-col items-center min-h-screen py-2'>
      <Login redirectTo={typeof from === "string" ? from : undefined} />
    </div>
  );
}
