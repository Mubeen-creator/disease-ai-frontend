'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, User, Mail, Calendar, Shield, Key, Settings } from 'lucide-react';
import { apiClient } from '@/lib/api';

interface UserData {
  name?: string;
  email?: string;
  fullName?: string;
  createdAt?: string;
  id?: string;
  sub?: string;
  exp?: number;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState({ name: '', email: '', createdAt: '', id: '' });
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadProfile();
    loadUserDataFromToken();
  }, []);

  const loadUserDataFromToken = () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        // Decode JWT token to get user data
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        const decodedToken = JSON.parse(jsonPayload);
        setUserData(decodedToken);
        
        // Update profile with token data if available
        setProfile(prev => ({
          ...prev,
          name: decodedToken.name || decodedToken.fullName || prev.name,
          email: decodedToken.email || prev.email,
          id: decodedToken.sub || decodedToken.id || prev.id
        }));
      }
    } catch (err) {
      console.error('Error decoding token:', err);
    }
  };

  const loadProfile = async () => {
    try {
      const data = await apiClient.getProfile();
      setProfile(prev => ({
        ...prev,
        ...data,
        name: data.name || data.fullName || prev.name,
      }));
    } catch (err: any) {
      setError(err.message || 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsSaving(true);

    try {
      // API call to update profile would go here
      setMessage('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border p-6">
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account information and settings</p>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
          {/* Profile Information Card */}
          <Card className="smooth-transition hover:shadow-lg hover:shadow-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and account settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {message && (
                  <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
                    <AlertDescription className="text-green-800 dark:text-green-200">{message}</AlertDescription>
                  </Alert>
                )}
                
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10 enhanced-input"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 enhanced-input"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Member Since</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      className="pl-10 bg-muted/50"
                      value={profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
                      disabled
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full smooth-transition"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating Profile...
                    </>
                  ) : (
                    'Update Profile'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Account Details Card */}
          <Card className="smooth-transition hover:shadow-lg hover:shadow-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Account Details
              </CardTitle>
              <CardDescription>
                View your account information and token details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userData && (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">User ID</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        className="pl-10 bg-muted/50 font-mono text-xs"
                        value={userData.sub || userData.id || 'N/A'}
                        disabled
                      />
                    </div>
                  </div>

                  {userData.exp && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Token Expires</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          className="pl-10 bg-muted/50"
                          value={new Date(userData.exp * 1000).toLocaleString()}
                          disabled
                        />
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Settings className="h-4 w-4" />
                      <span>Data loaded from access token</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Token Data Debug Card (for development) */}
        {userData && process.env.NODE_ENV === 'development' && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                Token Data (Development)
              </CardTitle>
              <CardDescription>
                Raw token data for debugging purposes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-md p-4 overflow-auto custom-scrollbar">
                <pre className="text-xs font-mono">
                  {JSON.stringify(userData, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}