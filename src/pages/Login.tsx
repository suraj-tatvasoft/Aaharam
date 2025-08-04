import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/10 via-background to-success/5 flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6 md:max-w-md md:space-y-8">
        {/* Illustration */}
        <div className="text-center">
          <div className="w-40 h-40 mx-auto mb-6 relative md:w-48 md:h-48 md:mb-8">
            {/* Main illustration background */}
            <div className="absolute inset-0 bg-gradient-to-br from-success/20 to-success/10 rounded-full"></div>

            {/* Person illustration */}
            <div className="absolute top-12 left-12 w-24 h-24">
              <div className="w-8 h-8 bg-foreground rounded-full mb-2"></div>
              <div className="w-16 h-12 bg-success rounded-t-lg"></div>
              <div className="w-20 h-8 bg-muted rounded-b-lg"></div>
            </div>

            {/* Phone illustration */}
            <div className="absolute top-8 right-8 w-20 h-32 bg-background rounded-xl border-2 border-border shadow-lg">
              <div className="w-6 h-6 bg-muted rounded-full mx-auto mt-3"></div>
              <div className="w-12 h-2 bg-success rounded mx-auto mt-2"></div>
              <div className="w-8 h-1 bg-muted rounded mx-auto mt-1"></div>
              <div className="w-10 h-4 bg-border rounded mx-auto mt-2 text-xs flex items-center justify-center text-foreground font-bold">
                LOGIN
              </div>
            </div>

            {/* Security badge */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-success rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-background rounded-sm"></div>
            </div>

            {/* Checkmark */}
            <div className="absolute bottom-8 left-8 w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-background border-l-0 border-t-0 rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <h1 className="text-3xl font-bold text-center">Login</h1>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember">Remember me</Label>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;