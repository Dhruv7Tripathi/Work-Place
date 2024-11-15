'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { LuLoader2 } from 'react-icons/lu';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        identifier: email,
        password: password,
      });
      if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          toast({
            title: 'Login Failed',
            description: 'Incorrect username or password',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Error',
            description: result.error,
            variant: 'destructive',
          });
        }
      }
      if (result?.url) {
        router.replace('/dashboard');
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Server Error occurred. Please try again after some time.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-md w-96">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Welcome to <span className="text-blue-600">Work Place</span>!
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-100 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6 relative">
          <input
            type={visible ? 'text' : 'password'}
            placeholder="Password"
            className="w-full p-3 bg-gray-100 rounded-lg pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span onClick={() => setVisible(!visible)} className="cursor-pointer absolute right-3 top-3 text-gray-400">
            👁
          </span>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 flex justify-center items-center text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {loading ? (
            <>
              <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don&apos;t have an account? <Link href="/signup" className="text-blue-600 hover:underline">Create a new account</Link>.
      </p>
    </div>
  );
}