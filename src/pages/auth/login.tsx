
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = async (role: string) => {
    setLoading(true);
    try {
      if (role === 'student') {
        await login('student@example.com', 'password');
      } else if (role === 'faculty') {
        await login('faculty@example.com', 'password');
      } else if (role === 'admin') {
        await login('admin@example.com', 'password');
      }
      navigate('/');
    } catch (error) {
      console.error('Demo login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="rounded-md bg-primary p-2 w-12 h-12 flex items-center justify-center">
              <GraduationCap className="text-white h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Campus Bridge</h1>
              <p className="text-sm text-muted-foreground">Academic LMS + Coding Platform</p>
            </div>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">For demo, login as:</p>
                <div className="flex gap-2 flex-wrap justify-center">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDemoLogin('student')}
                    disabled={loading}
                  >
                    Student
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDemoLogin('faculty')}
                    disabled={loading}
                  >
                    Faculty
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDemoLogin('admin')}
                    disabled={loading}
                  >
                    Admin
                  </Button>
                </div>
              </div>
            </CardFooter>
          </form>
        </Card>
        
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
