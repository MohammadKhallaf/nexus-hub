import { useNavigate, useRouteError } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@components/ui/button';

interface ErrorBoundaryProps {
  isRoot?: boolean;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ isRoot }: ErrorBoundaryProps) => {
  const error = useRouteError() as { status: number };
  const navigate = useNavigate();

  let errorText: JSX.Element;

  switch (error.status) {
    case 404:
      errorText = (
        <>
          <span className="text-info px-3 font-medium">404</span>
          <span className="px-3">This page doesn&apos;t exist!</span>
        </>
      );
      break;

    case 401:
      errorText = <div>You aren&apos;t authorized to see this</div>;
      break;

    case 503:
      errorText = <div>Looks like our API is down</div>;
      break;

    default:
      errorText = (
        <>
          <span className="text-warning px-3 font-medium">⚠️</span>
          <span className="px-3">Something went wrong</span>
        </>
      );
  }

  return (
    <div
      className={cn(
        { 'h-full w-full': !isRoot, 'h-screen w-screen': isRoot },
        'flex flex-col items-center justify-center gap-6'
      )}>
      <div className="flex flex-row gap-1 divide-x-2 text-3xl">{errorText}</div>
      <div className="flex w-fit flex-row gap-3">
        <Button variant="secondary" onClick={(): void => navigate(-1)}>
          Go back
        </Button>
        <Button onClick={(): void => navigate('/')}>Go home</Button>
      </div>
    </div>
  );
};

export default ErrorBoundary;
