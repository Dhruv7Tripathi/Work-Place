"use client";
import { signIn, signOut } from "next-auth/react";
import Header from "./header";
// import DarkModeToggle from "./ui/DarkModeToggle";
import { ThemeProvider } from "./theme-provider";

export const Appbar = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-100">
        <Header />
      </div>
      {/* <DarkModeToggle /> */}
      <ThemeProvider />
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-violet-700 text-5xl font-serif mb-5 flex justify-center">
          Welcome, Everyone!
        </h1>
        <p className="text-black-900 text-xl mb-6 flex justify-center text-center">
          Let’s organize your daily tasks in a streamlined and efficient manner to maximize productivity and success.
        </p>

        <button
          onClick={() => signIn()}
          className="p-3 cursor-pointer bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
};
