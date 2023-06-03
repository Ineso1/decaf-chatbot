//Create a login page for solana wallet
import React from "react";
import Image from "next/image";
import logo from "../../assets/img/logo-white.png";

const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg duration-300 hover:shadow-pink-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 hover:animate-spin-slow">
      {children}
    </button>
  );
};

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#330033]">
      <div className="absolute top-[15%] w-48 mb-10">
        <Image src={logo} alt="Logo" />
      </div>
      <div className="flex flex-col items-center justify-center w-full max-w-md p-8 rounded-xl shadow-lg bg-gradient-to-tr from-violet-900 to-pink-900 shadow-violet-dark">
        <h1 className="mb-4 text-3xl font-bold text-center text-white">
          Connect to your Phantom Wallet
        </h1>
        <p className="mb-8 text-gray-200 text-center">
          Click the button below to connect to your Phantom wallet and start
          using our app.
        </p>
        <Button>Connect</Button>
      </div>
    </div>
  );
}
