"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, useSession } from "next-auth/react";
import { LoginButton } from "@/app/auth/components/LoginButton";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div className="fixed bg-white flex justify-between  px-12 shadow-md w-screen">
      <div className="flex items-center">
        <Image
          src="/images/yourways_logo.png"
          width="500"
          height="500"
          alt="Logo"
          className="w-20 h-20 object-contain"
        />
      </div>
      <div className="flex items-center space-x-4">
        <Link
          href="#"
          className="text-gray-700 px-4 hover:text-red-500 duration-300"
        >
          Home
        </Link>
        <Link
          href="/services"
          className="text-gray-700 px-4 hover:text-red-500 duration-300"
        >
          Services
        </Link>
        <Link
          href="/about"
          className="text-gray-700 px-4 hover:text-red-500 duration-300"
        >
          About Us
        </Link>
        <Link
          href="/contact"
          className="text-gray-700 px-4 hover:text-red-500 duration-300"
        >
          Contact Us
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="text-gray-700 hover:text-red-500 duration-300"
          onClick={() => {
            if (!session?.user.access_token) {
              signIn();
            }
            router.push("/home/dashboard");
          }}
        >
          Login
        </button>
        <Link
          href={"/auth/registration"}
          className="bg-gradient-to-r  flex  items-center justify-between from-red-500 to-orange-500 text-white px-4 py-2 rounded-full hover:from-red-500 hover:to-orange-500 font-bold  shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
        >
          <FontAwesomeIcon className="w-3 h-3 me-2 " icon={faUser} /> Signup
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
