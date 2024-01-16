"use client";
import { useToast } from "@/app/providers/ToastProvider";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

export default function LoginForm(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useToast();
  const router = useRouter();
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    if (res?.ok) {
      showToast("welcome to the app", "success");
      router.push("/home/dashboard");
    } else {
      showToast("Credintials incorrecte", "warning");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="card card-side bg-base-100 shadow-xl w-[500px] flex flex-col gap-6 p-5"
    >
      <p className="text-3xl font-bold text-gray-700 mb-6">Login</p>
      <div className="flex flex-col">
        <div className="flex flex-col w-full gap-3">
          <label className="block text-lg font-medium text-gray-800 mb-2">
            Email
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full border-gray-300 focus:border-orange-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col w-full gap-3">
          <label className="block text-lg font-medium text-gray-800 mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full border-gray-300 focus:border-orange-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex flex-row w-full gap-3">
        <button
          type="submit"
          className="btn w-full bg-orange-500 text-white hover:bg-orange-600"
        >
          Log in
        </button>
      </div>
    </form>
  );
};
