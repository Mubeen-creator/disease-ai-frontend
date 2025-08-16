"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Brain,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";
import { useAuth } from "@/app/auth/AuthContext";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await apiClient.login(formData.email, formData.password);
      login(response.access_token);
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(15_23_42/0.15)_1px,transparent_0)] [background-size:24px_24px]" />

      <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-900 text-white rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
            MedAI Platform
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-sm sm:text-base text-slate-600 px-4 sm:px-0">
            Sign in to continue your medical AI journey
          </p>
        </div>

        {/* Main Card */}
        <Card className="bg-white/80 backdrop-blur-xl border-2 border-slate-200/50 shadow-xl lg:w-[600px]">
          <CardContent className="p-4 sm:p-6 lg:p-8 md:p-8">
            <div className="space-y-4 sm:space-y-6">
              {error && (
                <Alert
                  variant="destructive"
                  className="bg-red-50 border-red-200"
                >
                  <AlertDescription className="text-red-800 text-sm">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-slate-700 font-medium text-sm sm:text-base"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 sm:pl-12 h-10 sm:h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm sm:text-base w-full"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    onKeyDown={handleKeyDown}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-slate-700 font-medium text-sm sm:text-base"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-10 sm:h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm sm:text-base w-full"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    onKeyDown={handleKeyDown}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full h-10 sm:h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 group text-sm sm:text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </Button>

              <div className="text-center space-y-3">
                <a
                  href="#"
                  className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 block"
                >
                  Forgot your password?
                </a>
                <p className="text-xs sm:text-sm text-slate-600">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/signup">
                    <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                      Sign up
                    </button>
                  </Link>
                </p>
              </div>

              {/* Demo Credentials */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-xs sm:text-sm text-blue-800 font-medium mb-2">
                  Demo Credentials:
                </div>
                <div className="text-xs text-blue-700 space-y-1">
                  <div className="break-all">Email: demo@example.com</div>
                  <div>Password: password</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Badge */}
        <div className="mt-4 sm:mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/60 backdrop-blur-xl rounded-full border border-slate-200/50 text-xs sm:text-sm text-slate-600">
            <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
            HIPAA Compliant & Secure
          </div>
        </div>
      </div>
    </div>
  );
}
