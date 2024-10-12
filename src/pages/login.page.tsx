import { Link } from 'react-router-dom';
import EROUTES from '@app/constants/routes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-card-foreground text-white">
        <CardHeader>
          <div className="mb-4 flex justify-center text-2xl font-semibold">
            <span>Nexus</span>
            <span className="text-secondary-light">Hub</span>
          </div>
          <CardTitle className="text-center text-2xl font-bold">Sign in to your account</CardTitle>
        </CardHeader>
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
      </Card>
    </div>
  );
};

export default LoginPage;
