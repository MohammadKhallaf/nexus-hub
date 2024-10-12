import { Card, CardHeader, CardTitle } from '@components/ui/card';

const AuthLayout = ({
  children,
  header,
}: {
  children: React.ReactNode;
  header: React.ReactNode | string;
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-card-foreground text-white">
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
