// "use client"
// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';

// export default function () {
//   const router = useRouter();

//   return <div className="flex flex-col items-center justify-center flex-grow 
//   p-4 m-4 min-h-screen bg-white-200 via-blue-50">
//     <button onClick={async () => {
//       await signIn("google");
//     }}>Login with google</button>

//     <br />
//     <button onClick={async () => {
//       await signIn("github");
//     }} >Login with Github</button>
// <br />
// <button onClick={async () => {
//   const res = await signIn("credentials", {
//     username: "placeholder",
//     password: "your password",
//     redirect: false,
//   });
//   console.log(res);
//   router.push("/")
// }}>Login with email</button>

//   </div>
// }
import React from "react";
import SignInComponent from "@/components/SignInComponent";

const SignIn = () => {
  return <SignInComponent />;
};

export default SignIn;