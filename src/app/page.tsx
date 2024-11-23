// "use client";
// import { AuroraBackground } from "@/components/background";
// import Header from "@/components/header";
// import Link from "next/link";
// import { NEXT_AUTH_CONFIG } from "@/lib/auth";
// import { getServerSession } from "next-auth"
// import { signIn } from "next-auth/react";
// import { Appbar } from "@/components/Appbar";

// async function getUser() {
//   const session = await getServerSession(NEXT_AUTH_CONFIG);
//   return session;
// }

// export default function Page() {
//   // const session = await getUser();
//   return (
//     <>
//       <Header />
//       {/* <Appbar /> */}
//       {/* {JSON.stringify(session)} */}
//       {/* <AuroraBackground> */}
//       <h1 className="text-violet-700 text-5xl font-serif mb-5">Welcome, Everyone  !</h1>
//       <p className="text-black-900 text-xl mb-6">
//         Let’s organize your daily tasks in a streamlined and efficient manner to maximize productivity and success.
//       </p>
//       <button onClick={() => {
//         window.location.href = '/auth/signin'
//       }} className="p-3 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700 transition">
//         Register
//       </button>
//       {/* </AuroraBackground> */}
//     </>
//   );
// }

import { Appbar } from "@/components/Appbar";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth"
import { signIn } from "next-auth/react";

async function getUser() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  return session;
}

export default async function Home() {
  const session = await getUser();

  return (
    <div>
      <Appbar />
      {/* {JSON.stringify(session)} */}
    </div>
  );
}