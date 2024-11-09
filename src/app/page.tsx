import { AuroraBackground } from "@/components/background";
import Header from "@/components/header";
import Link from "next/link";
export default function Page() {
  return (
    <>
      <Header />
      <AuroraBackground>
        <h1 className="text-violet-700 text-5xl font-serif mb-5">Welcome, Everyone!</h1>
        <p className="text-black-900 text-xl mb-6">
          Let’s organize your daily tasks in a streamlined and efficient manner to maximize productivity and success.
        </p>
        <Link href="/auth/signin" className="p-3 z-10 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Register
        </Link>
      </AuroraBackground>
    </>
  );
}
