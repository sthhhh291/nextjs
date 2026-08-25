// import Login from "../ui/login";
import Login from "@/app/ui/login";

export default async function Page() {
  return (
    <div className='flex flex-col items-center min-h-screen py-2'>
      <h2 className='text-xl font-bold bg-center'>Login</h2>
      <Login />
    </div>
  );
}