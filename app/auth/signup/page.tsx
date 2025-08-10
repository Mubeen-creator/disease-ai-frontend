import { Header } from '@/components/common/Header';
import { SignupForm } from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header showAuthButtons={false} />
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <SignupForm />
      </div>
    </main>
  );
}