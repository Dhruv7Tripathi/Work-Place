'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { LuLoader } from 'react-icons/lu';

export default function SignUpForm() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/signup', { email, password, name });
      toast({
        title: 'Success',
        description: res.data.message
      })
      if (res.status == 201) {
        router.push(`/verify/${encodeURIComponent(email)}`);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again later.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 className="text-2xl font-bold mb-6 text-center">Welcome to <span className="text-blue-600">Work Place</span>!</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Full name"
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Your email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 relative">
          <input
            type={visible ? 'text' : 'password'}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded"
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
          className="w-full flex justify-center items-center bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition-colors"
        >
          {loading ? (
            <>
              <LuLoader className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account? <Link href="/signin" className="text-purple-600 hover:underline">Log in</Link>
      </p>
    </div>
  );
}