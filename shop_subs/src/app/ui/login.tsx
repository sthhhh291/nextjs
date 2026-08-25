import Form from "next/form";
import {login} from "@/app/actions"
import { redirect } from "next/dist/client/components/navigation";

export default function Login() {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    try {
      await login(formData);
      console.log("Login successful");
      redirect("/"); // Redirect to the customers page after successful login
      // return data; // Return the response data if needed
    } catch (error) {
      console.error("Error during login:", error);
      redirect("/login"); // Redirect to the login page with an error query parameter
      // throw error; // Rethrow the error to be handled by the caller
    }
  };
  return (
    <div className='flex flex-col items-center min-h-screen py-2'>
      <h2 className='text-xl font-bold bg-center'>Login</h2>
      <Form
        action={handleSubmit}
        className='flex flex-col items-center   space-y-2'>
        <input
          type='text'
          name='username'
          placeholder='Username'
          className='border border-gray-300 rounded px-3 py-2 mb-2'
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          className='border border-gray-300 rounded px-3 py-2 mb-2'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600'>
          Login
        </button>
      </Form>
    </div>
  );
}
