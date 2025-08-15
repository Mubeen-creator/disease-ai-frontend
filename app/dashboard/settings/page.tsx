'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Settings, Bell, Shield, Trash2, Download, Palette } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    updates: false,
    reminders: true,
  });
  const [privacy, setPrivacy] = useState({
    shareData: false,
    analytics: true,
  });

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border p-6">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences and privacy settings</p>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Notifications */}
          <Card className="smooth-transition hover:shadow-lg hover:shadow-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notifications
              </CardTitle>
              <CardDescription>
                Manage how you receive notifications from MedAI Assistant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-600">Receive important updates via email</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => 
                    setNotifications({ ...notifications, email: checked })
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Product Updates</Label>
                  <p className="text-sm text-gray-600">Get notified about new features and improvements</p>
                </div>
                <Switch
                  checked={notifications.updates}
                  onCheckedChange={(checked) => 
                    setNotifications({ ...notifications, updates: checked })
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Health Reminders</Label>
                  <p className="text-sm text-gray-600">Receive helpful health and wellness reminders</p>
                </div>
                <Switch
                  checked={notifications.reminders}
                  onCheckedChange={(checked) => 
                    setNotifications({ ...notifications, reminders: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card className="smooth-transition hover:shadow-lg hover:shadow-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Privacy & Data
              </CardTitle>
              <CardDescription>
                Control how your data is used to improve our services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Share Anonymous Data</Label>
                  <p className="text-sm text-gray-600">Help improve AI responses with anonymized usage data</p>
                </div>
                <Switch
                  checked={privacy.shareData}
                  onCheckedChange={(checked) => 
                    setPrivacy({ ...privacy, shareData: checked })
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Analytics</Label>
                  <p className="text-sm text-gray-600">Allow analytics to help us improve user experience</p>
                </div>
                <Switch
                  checked={privacy.analytics}
                  onCheckedChange={(checked) => 
                    setPrivacy({ ...privacy, analytics: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="smooth-transition hover:shadow-lg hover:shadow-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Data Management
              </CardTitle>
              <CardDescription>
                Download or delete your personal data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Export Data</Label>
                  <p className="text-sm text-gray-600">Download a copy of all your data</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Delete Account</Label>
                  <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Medical Disclaimer */}
          <Alert className="bg-yellow-50 border-yellow-200">
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-yellow-800">
              <strong>Privacy Notice:</strong> We prioritize your privacy and never store sensitive health information. 
              All conversations are encrypted and processed securely. Your data is never shared with third parties.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}