import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import loginMain from "@/assets/login-main.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        <div className="relative flex-1 flex flex-col justify-end items-center pb-0">
          <img
            src={loginMain}
            alt="Login Illustration"
            className="w-full max-w-xs mx-auto"
          />
        </div>
        {/* Bottom Section: Login Form */}
        <div className="bg-white rounded-t-3xl min-h-[420px] z-10 relative px-6 pt-8 pb-4 mt-[-10px]">
          <h1 className="text-2xl font-bold text-center text-black mb-6">Login</h1>
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div>
              <Label htmlFor="username" className="block text-sm font-medium text-black mb-1">Username</Label>
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
              <Label htmlFor="password" className="block text-sm font-medium text-black mb-1">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
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
                  className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent focus:bg-transparent hover:text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            {/* Remember Me */}
            <div className="flex items-center mb-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="ml-2 text-sm text-black">Remember me</Label>
            </div>
            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-12 text-lg bg-foreground text-background hover:bg-foreground/90"
              size="lg"
            >
              Login
            </Button>
          </form>
          {/* Bottom Indicator Bar */}
          <div className="w-24 h-1.5 bg-black rounded-full mx-auto mt-6 mb-2" />
        </div>
      </div>
    </Container>
  );
};

import Container from "@/components/Container";

export default Login;