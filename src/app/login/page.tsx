"use client";
import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userName = formData.get("userName");
    const res = await fetch("api/login", {
      method: "POST",
      body: JSON.stringify({ userName }),
    });
    const { jwt } = await res.json();
    if (jwt) {
      router.push("/profile");
    }
  };

  return (
    <div>
      <Header />
      <h1 className="text-3xl text-red-400">I am Login Page.</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter your name" name="userName" />
        <button type="submit" className="bg-blue-400 rounded-lg p-2">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Login;
