import { Header } from '@/components/common/Header';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header showAuthButtons={false} />
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <ForgotPasswordForm />
      </div>
    </main>
  );
}