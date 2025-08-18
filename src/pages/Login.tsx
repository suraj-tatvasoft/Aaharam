import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '@/store/slice/userSlice';
import { Eye, EyeOff } from 'lucide-react';
import loginMain from '@/assets/login-img.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Container from '@/components/Container';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useThemeColor } from '@/hooks/useThemeColor';
import EyeClose from '@/assets/eye_close.svg';
import EyeOpen from '@/assets/eye_open.svg';

const LoginSchema = Yup.object().shape({
  username: Yup.string().trim('No leading or trailing spaces allowed').strict(true).required('Username is required'),
  password: Yup.string().trim('No leading or trailing spaces allowed').strict(true).required('Password is required'),
});

const Login = () => {
  // Set theme color for login page
  useThemeColor('#E1FFE0');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container>
      <div className="flex flex-1 flex-col">
        {/* Top Section: Illustration with light green bg */}
        <div className="flex flex-1 flex-col items-center justify-end bg-white pb-0">
          <div className="flex h-full w-full items-end justify-center rounded-br-[100px] bg-[#E1FFE0]">
            <img src={loginMain} alt="Login Illustration" className="relative bottom-[-5px]" />
          </div>
        </div>
        {/* Bottom Section: Login Form */}
        <div className="flex-1 bg-[#E1FFE0]">
          <div className="flex h-full w-full items-end justify-center rounded-tl-[100px] bg-white">
            <div className="relative z-10 min-h-[420px] w-full px-4 pb-4 pt-8">
              <h1 className="mb-10 text-center text-2xl font-normal text-[#212121]">Login</h1>
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
                  <Form>
                    {/* Username */}
                    <div className="space-y-5">
                      <div>
                        <Label htmlFor="username" className="font-normal mb-[12px] block text-sm text-[#212121]">
                          Username
                        </Label>
                        <Field
                          as={Input}
                          id="username"
                          name="username"
                          type="text"
                          placeholder="Enter your username"
                          className="h-[43px] border-[1px] border-[#21212180] text-[#212121] placeholder:text-[#212121CC] focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-[#38963B] focus-visible:outline-none"
                          autoComplete="username"
                        />
                        <ErrorMessage name="username" className="mt-1 text-xs text-red-500">
                          {(msg) => <div className="mt-1 text-xs text-red-500">{msg}</div>}
                        </ErrorMessage>
                      </div>
                      {/* Password */}
                      <div>
                        <Label htmlFor="password" className="font-normal mb-[12px] block text-sm text-[#212121]">
                          Password
                        </Label>
                        <div className="relative">
                          <Field
                            as={Input}
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className="h-[43px] border-[1px] border-[#21212180] pr-10 text-[#212121] placeholder:text-[#212121CC] focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-[#38963B] focus-visible:outline-none"
                            autoComplete="current-password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full w-12 hover:bg-transparent hover:text-gray-500 focus:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <img src={EyeClose} /> : <img src={EyeOpen} />}
                          </Button>
                        </div>
                        <ErrorMessage name="password">{(msg) => <div className="mt-1 text-xs text-red-500">{msg}</div>}</ErrorMessage>
                      </div>
                    </div>
                    {/* Remember Me */}
                    <div className="my-[14px] flex items-center">
                      <Checkbox
                        className={rememberMe ? 'border-primary' : 'border-black'}
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember" className="ml-2 text-sm font-normal text-[#212121]">
                        Remember Me
                      </Label>
                    </div>
                    {/* Login Button */}
                    <Button
                      type="submit"
                      className="mt-7 h-11 w-full bg-foreground text-[16px] font-medium text-background hover:bg-foreground/90"
                      size="lg"
                    >
                      Login
                    </Button>
                  </Form>
                )}
              </Formik>
              {/* Bottom Indicator Bar */}
              {/* <IndicatorBar className="mt-6 mb-2" /> */}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

// import IndicatorBar from "@/components/IndicatorBar";

export default Login;
