// import Login from "../ui/login";
import Login from "@/app/(auth)/login/login";

export default async function Page() {
  return (
    <div className='flex flex-col items-center min-h-screen py-2'>
      <Login />
    </div>
  );
}
