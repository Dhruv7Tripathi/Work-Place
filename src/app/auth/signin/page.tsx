import SignInForm from '@/components/auth/signin';
import { Metadata } from 'next'

import { AuroraBackground } from "@/components/background";
export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Signin page',
  keywords: 'Signin, Auth, Authentication, Login, Credentials'
}

export default function LoginPage() {
  return (
    <AuroraBackground>
      <div>
        <SignInForm />
      </div>
    </AuroraBackground>
  );
}