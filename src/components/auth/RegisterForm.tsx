import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface RegisterFormProps {
  onToggleMode: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const { register } = useAuth();

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!name) {
      newErrors.name = 'Name is required';
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const success = await register(name, email, password);
    
    if (!success) {
      setErrors({ email: 'Registration failed. Email may already be in use.' });
    }
    
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-elegant animate-slide-fade-in">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
        <CardDescription>
          Join us and start your journey today
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
              }}
              className={cn(
                "transition-all duration-200",
                errors.name && "border-destructive animate-shake-error"
              )}
              disabled={loading}
            />
            {errors.name && (
              <p className="text-sm text-destructive animate-slide-fade-in">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
              }}
              className={cn(
                "transition-all duration-200",
                errors.email && "border-destructive animate-shake-error"
              )}
              disabled={loading}
            />
            {errors.email && (
              <p className="text-sm text-destructive animate-slide-fade-in">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
              }}
              className={cn(
                "transition-all duration-200",
                errors.password && "border-destructive animate-shake-error"
              )}
              disabled={loading}
            />
            {errors.password && (
              <p className="text-sm text-destructive animate-slide-fade-in">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: undefined }));
              }}
              className={cn(
                "transition-all duration-200",
                errors.confirmPassword && "border-destructive animate-shake-error"
              )}
              disabled={loading}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive animate-slide-fade-in">{errors.confirmPassword}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <LoadingSpinner size="sm" variant="minimal" />
                <span>Creating account...</span>
              </div>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-primary hover:underline font-medium transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};