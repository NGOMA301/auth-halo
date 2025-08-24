import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LogOut, 
  User, 
  Mail, 
  Calendar,
  Shield,
  Trash2,
  Settings
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Dashboard: React.FC = () => {
  const { user, logout, deleteAccount } = useAuth();

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleDeleteAccount = async () => {
    await deleteAccount();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">Auth Halo</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-muted text-xs font-medium">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4 animate-slide-fade-in">
            <Avatar className="w-20 h-20 mx-auto shadow-float">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-3xl font-bold text-gradient mb-2">
                Welcome back, {user.name}!
              </h2>
              <p className="text-muted-foreground">
                Manage your account and security settings
              </p>
            </div>
          </div>

          {/* Account Information */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-elegant animate-slide-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Account Information</span>
                </CardTitle>
                <CardDescription>
                  Your personal account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Full Name</p>
                    <p className="text-sm text-muted-foreground">{user.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email Address</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Account Status</p>
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="shadow-elegant animate-slide-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>
                  Manage your account security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Two-Factor Authentication
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full justify-start">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="text-center p-6 animate-slide-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-2xl font-bold text-primary">7</div>
              <p className="text-sm text-muted-foreground">Days Active</p>
            </Card>
            
            <Card className="text-center p-6 animate-slide-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-2xl font-bold text-primary">1</div>
              <p className="text-sm text-muted-foreground">Active Session</p>
            </Card>
            
            <Card className="text-center p-6 animate-slide-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-2xl font-bold text-success">Secure</div>
              <p className="text-sm text-muted-foreground">Account Status</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};