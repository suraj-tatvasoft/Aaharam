import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import loginMain from '@/assets/login-main.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Container from '@/components/Container';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add login validation here if needed
    navigate('/analytics');
  };

  return (
    <Container>
      <div className="flex flex-1 flex-col bg-[#DFFFEA]">
        {/* Top Section: Illustration with light green bg */}
        <div className="relative flex flex-1 flex-col items-center justify-end pb-0">
          <img src={loginMain} alt="Login Illustration" className="mx-auto w-full max-w-xs" />
        </div>
        {/* Bottom Section: Login Form */}
        <div className="relative z-10 mt-[-10px] min-h-[420px] rounded-t-3xl bg-white px-6 pb-4 pt-8">
          <h1 className="mb-6 text-center text-2xl font-normal text-[#212121]">Login</h1>
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div>
              <Label htmlFor="username" className="font-regular mb-1 block text-sm text-[#212121]">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12"
                autoComplete="username"
              />
            </div>
            {/* Password */}
            <div>
              <Label htmlFor="password" className="font-regular mb-1 block text-sm text-[#212121]">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-10"
                  autoComplete="current-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent hover:text-gray-500 focus:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            {/* Remember Me */}
            <div className="mb-2 flex items-center">
              <Checkbox id="remember" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked as boolean)} />
              <Label htmlFor="remember" className="font-regular ml-2 text-sm text-[#212121]">
                Remember me
              </Label>
            </div>
            {/* Login Button */}
            <Button type="submit" className="h-11 w-full bg-foreground text-lg font-medium text-background hover:bg-foreground/90" size="lg">
              Login
            </Button>
          </form>
          {/* Bottom Indicator Bar */}
          {/* <IndicatorBar className="mt-6 mb-2" /> */}
        </div>
      </div>
    </Container>
  );
};

// import IndicatorBar from "@/components/IndicatorBar";

export default Login;
