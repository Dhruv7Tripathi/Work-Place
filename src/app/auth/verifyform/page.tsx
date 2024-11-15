'use client'
import VerifyForm from '@/components/auth/verify';
import { useParams } from 'next/navigation';

export default function VerifyPage() {

  const params = useParams<{ email: string }>();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-purple-400 flex items-center justify-center">
      <VerifyForm email={decodeURIComponent(params.email)} />
    </div>
  );
}