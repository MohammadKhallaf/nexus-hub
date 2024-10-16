import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm, type SubmitErrorHandler, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { setAuth } from '@actions';
import EROUTES from '@app/constants/routes';
import type { TFormSubmitHandler } from '@app/types/global.types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { useAppDispatch } from '@hooks';
import { userLoginSchema } from '@schemas';
import type { TLoginForm } from '@types';
import AuthLayout from '../_components/auth.layout';
import { loginFields } from '../_data';
import { useLogin } from '../_hooks';

const formAnimation = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 },
  },
};

const InputWithMotion = motion.create(Input);
const ButtonWithMotion = motion.create(Button);

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [shake, setShake] = useState(false);

  const { isPending, mutate } = useLogin({
    onSuccess: (data) => {
      toast.success('Logged in successfully!');
      dispatch(
        setAuth({
          user: {
            id: data.user.id,
            email: data.user.email,
            firstName: data.user.user_metadata.first_name as string,
            lastName: data.user.user_metadata.last_name as string,
            avatarUtl: data.user.user_metadata.avatar_url as string,
          },
          token: data.session?.access_token,
        })
      );
      setTimeout(() => {
        form.reset();
        navigate(EROUTES.HOME);
      }, 3000);
    },
    onError: (error) => {
      toast.error(error.message || 'An error occurred during registration');
    },
  });

  const form = useForm<TLoginForm>({
    resolver: yupResolver(userLoginSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<TLoginForm> = (data) => {
    mutate(data);
  };

  const onError: SubmitErrorHandler<TLoginForm> = (errors) => {
    console.error('Form validation errors:', errors);
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <AuthLayout header="Sign in to your account" title="Login">
      <CardContent>
        <Form {...form}>
          <motion.form
            variants={formAnimation}
            animate={shake ? 'shake' : 'initial'}
            className="dark flex flex-col gap-3"
            onSubmit={form.handleSubmit(onSubmit, onError) as TFormSubmitHandler}>
            <div className="grid grid-cols-2 gap-3">
              {loginFields.map((_field, index) => (
                <FormField
                  key={_field.name}
                  control={form.control}
                  name={_field.name}
                  render={({ field }) => (
                    <FormItem className={cn('space-y-2', _field.className)}>
                      <FormLabel>{_field.label}</FormLabel>
                      <FormControl>
                        <InputWithMotion
                          whileTap={{ scale: 0.98 }}
                          whileFocus={{ scale: 1.05 }}
                          autoFocus={index === 0}
                          placeholder={_field.placeholder}
                          type={_field.type}
                          className={cn(
                            // 'transition-all duration-200 ease-in-out',
                            'focus:shadow-3xl focus:bg-white focus:text-black focus:shadow-white'
                          )}
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <ButtonWithMotion
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              type="submit"
              className="mt-8 w-full"
              disabled={isPending}>
              {isPending ? 'Logging in...' : 'Login'}
            </ButtonWithMotion>
          </motion.form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link to={EROUTES.REGISTER} className="font-medium text-primary-light">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </AuthLayout>
  );
};

export default LoginPage;
