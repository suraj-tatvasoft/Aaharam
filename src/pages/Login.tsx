import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '@/store/slice/userSlice';
import { Eye, EyeOff } from 'lucide-react';
import loginMain from '@/assets/login-main.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Container from '@/components/Container';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .trim('No leading or trailing spaces allowed')
    .strict(true)
    .required('Username is required'),
  password: Yup.string()
    .trim('No leading or trailing spaces allowed')
    .strict(true)
    .required('Password is required'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting }) => {
              const trimmed = {
                username: values.username.trim(),
                password: values.password.trim(),
              };
              dispatch(updateUser({ name: trimmed.username }));
              setSubmitting(false);
              navigate('/analytics');
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                {/* Username */}
                <div>
                  <Label htmlFor="username" className="font-regular mb-1 block text-sm text-[#212121]">
                    Username
                  </Label>
                  <Field
                    as={Input}
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    className="h-12"
                    autoComplete="username"
                  />
                  <ErrorMessage name="username" className="mt-1 text-xs text-red-500">
                    {msg => <div className="mt-1 text-xs text-red-500">{msg}</div>}
                  </ErrorMessage>
                </div>
                {/* Password */}
                <div>
                  <Label htmlFor="password" className="font-regular mb-1 block text-sm text-[#212121]">
                    Password
                  </Label>
                  <div className="relative">
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
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
                  <ErrorMessage name="password">
                    {msg => <div className="mt-1 text-xs text-red-500">{msg}</div>}
                  </ErrorMessage>
                </div>
                {/* Remember Me */}
                <div className="mb-2 flex items-center">
                  <Checkbox id="remember" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked as boolean)} />
                  <Label htmlFor="remember" className="ml-2 text-sm text-[#212121]">Remember Me</Label>
                </div>
                {/* Login Button */}
                <Button type="submit" className="h-11 w-full bg-foreground text-lg font-medium text-background hover:bg-foreground/90" size="lg">
                  Login
                </Button>
              </Form>
            )}
          </Formik>
          {/* Bottom Indicator Bar */}
          {/* <IndicatorBar className="mt-6 mb-2" /> */}
        </div>
      </div>
    </Container>
  );
};

// import IndicatorBar from "@/components/IndicatorBar";

export default Login;
