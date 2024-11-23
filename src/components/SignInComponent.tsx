"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";

const SignInComponent = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
      <Card className="w-[90%] p-1 rounded-lg bg-gradient-to-br from-white via-gray-200 to-white shadow-2xl shadow-slate-900 sm:w-[400px] space-y-3">
        <div className="relative h-32 bg-gradient-to-r from-blue-700 to-blue-200 dark:to-black">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/logo.png"
              width={80}
              height={80}
              alt="Logo"
              className="rounded-full bg-white p-2"
            />
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-gray-800 dark:text-gray-900">
            Welcome
          </CardTitle>
          <CardDescription className="text-center text-[14px] text-gray-800 dark:text-gray-900">
            Sign in to access your account and start your journey with us 🚀
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Button
              className="gap-2 font-semibold"
              variant="outline"
              onClick={() => {
                signIn("google", { callbackUrl: "/todo" });
              }}
            >
              <Image src="/google.png" width={22} height={22} alt="google" />
              Continue with Google
            </Button>
            <Button className="gap-2 font-semibold" variant="outline" onClick={() => {
              signIn("github", { callbackUrl: "/todo" });
            }}><Image src="/github.png" width={22} height={22} alt="github" />Continue with Github</Button>
          </div>
          <br />
          <button onClick={async () => {
            const res = await signIn("credentials", {
              username: "placeholder",
              password: "your password",
              redirect: false,
            });
            console.log(res);
            router.push("/")
          }}>Login with email</button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInComponent;