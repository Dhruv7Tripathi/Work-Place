
import SignUpForm from '@/components/auth/signup';

import { Metadata } from 'next';

import { AuroraBackground } from "@/components/background";

export const metadata: Metadata = {
  title: 'SignUp',
  description: 'Signup page',
  keywords: 'Signup, Auth, Authentication, Register, Credentials'
}

export default function SignUpPage() {
  return (
    <AuroraBackground>
      <div >
        <SignUpForm />
      </div>
    </AuroraBackground>
  );
}