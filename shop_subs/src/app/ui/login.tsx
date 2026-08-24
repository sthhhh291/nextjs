import Form from "next/form";

export default function Login() {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const apiAddress = process.env.API_ADDRESS?.replace(/\/$/, "");

    if (!apiAddress) {
      throw new Error("API_ADDRESS is not configured");
    }

    try {
      const response = await fetch(`${apiAddress}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Handle successful login (e.g., redirect to dashboard)
        console.log("Login successful");
      } else {
        // Handle login failure (e.g., show error message)
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
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
