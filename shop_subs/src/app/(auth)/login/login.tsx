import Form from "next/form";
import { login } from "@/actions/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function Login() {
  return (
    <Card className='flex flex-col items-center min-h-screen py-2 justify-center'>
      <h2 className='text-xl font-bold bg-center'>Login</h2>
      <Form
        action={login}
        className='flex flex-col items-center content-center space-y-2'>
        <Input
          type='text'
          name='username'
          placeholder='Username'
          className='border border-gray-300 rounded px-3 py-2 mb-2'
        />
        <Input
          type='password'
          name='password'
          placeholder='Password'
          className='border border-gray-300 rounded px-3 py-2 mb-2'
        />
        <Button
          type='submit'
          className='bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600'>
          Login
        </Button>
      </Form>
    </Card>
  );
}
