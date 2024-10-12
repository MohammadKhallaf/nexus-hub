import EROUTES from '@app/constants/routes';
import { Link } from 'react-router-dom';
import AuthLayout from '../_components/auth.layout';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage: React.FC = () => {
  return (
    <AuthLayout header="Sign in to your account">
      <CardContent>
        <form className="dark flex flex-col gap-3">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Enter your password" type="password" />
          </div>

          <Button type="submit" className="mt-8 w-full">
            Sign In
          </Button>
        </form>
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
