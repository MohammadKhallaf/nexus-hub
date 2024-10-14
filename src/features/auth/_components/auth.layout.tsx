import { Helmet } from 'react-helmet-async';
import { Card, CardHeader, CardTitle } from '@components/ui/card';

const AuthLayout = ({
  children,
  header,
  title,
}: {
  children: React.ReactNode;
  header: React.ReactNode | string;
  title: string;
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background py-12 sm:px-4 md:px-6 lg:px-8">
      <Helmet>
        <title>NH | {title}</title>
      </Helmet>
      <Card className="w-full max-w-full bg-card-foreground text-white md:max-w-md">
        <CardHeader>
          <div className="mb-4 flex justify-center text-2xl font-semibold">
            <span>Nexus</span>
            <span className="text-secondary-light">Hub</span>
          </div>
          <CardTitle className="text-center text-2xl font-bold">{header}</CardTitle>
        </CardHeader>
        {children}
      </Card>
    </div>
  );
};

export default AuthLayout;
