import EROUTES from '@app/constants/routes';
import { Link } from 'react-router-dom';
import { Form, useForm } from 'react-hook-form';
import type { InferType } from 'yup';
import { userCreateSchema } from '@app/schemas/auth.schemas';
import AuthLayout from '../_components/auth.layout';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RegisterPage: React.FC = () => {
  useForm<InferType<typeof userCreateSchema>>({});
  return (
    <AuthLayout header="Create an account">
      <CardContent>
        <Form className="dark flex flex-col gap-3">
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Create a password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" placeholder="Confirm your password" type="password" />
          </div>

          <Button type="submit" className="mt-8 w-full">
            Sign In
          </Button>
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
