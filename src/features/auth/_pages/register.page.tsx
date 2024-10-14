import Confetti from 'react-confetti';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useForm, type SubmitErrorHandler, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
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
import { userCreateSchema } from '@schemas';
import type { TRegisterForm } from '@types';
import AuthLayout from '../_components/auth.layout';
import { registerFields } from '../_data';
import { useRegister } from '../_hooks';

const formAnimation = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 },
  },
};

const InputWithMotion = motion.create(Input);
const ButtonWithMotion = motion.create(Button);

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [shake, setShake] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const { isPending, mutate } = useRegister({
    onSuccess: () => {
      setShowConfetti(true);
      toast.success('Account created successfully!');
      setTimeout(() => {
        form.reset();
        setShowConfetti(false);
        navigate(EROUTES.LOGIN);
      }, 3000);
    },
    onError: (error) => {
      toast.error(error.message || 'An error occurred during registration');
    },
  });

  const form = useForm<TRegisterForm>({
    resolver: yupResolver(userCreateSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<TRegisterForm> = ({ confirmPassword: _, ...data }) => {
    mutate(data);
  };

  const onError: SubmitErrorHandler<TRegisterForm> = (errors) => {
    console.error('Form validation errors:', errors);
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <AuthLayout header="Create an account" title="Register">
      <AnimatePresence>
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
          />
        )}
      </AnimatePresence>
      <CardContent>
        <Form {...form}>
          <motion.form
            variants={formAnimation}
            animate={shake ? 'shake' : 'initial'}
            className="dark flex flex-col gap-3"
            onSubmit={form.handleSubmit(onSubmit, onError) as TFormSubmitHandler}>
            <div className="grid grid-cols-2 gap-3">
              {registerFields.map((_field, index) => (
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
              {isPending ? 'Creating Account...' : 'Create Account'}
            </ButtonWithMotion>
          </motion.form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to={EROUTES.LOGIN} className="font-medium text-primary-light">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </AuthLayout>
  );
};

export default RegisterPage;
