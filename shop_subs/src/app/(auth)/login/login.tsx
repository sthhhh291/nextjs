import Form from "next/form";
import { login } from "@/app/actions";

export default function Login() {
  return (
    <div className='flex flex-col items-center min-h-screen py-2'>
      <h2 className='text-xl font-bold bg-center'>Login</h2>
      <Form action={login} className='flex flex-col items-center content-center space-y-2'>
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
