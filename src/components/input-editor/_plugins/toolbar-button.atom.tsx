import { motion } from 'framer-motion';
import { type LucideProps } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const ButtonWithMotion = motion.create(Button);

const ToolbarButton = ({
  tip,
  onClick,
  active,
  ...props
}: {
  tip: string;
  onClick?: () => void;
  active?: boolean;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  disabled?: boolean;
}) => {
  const { icon: _icon, ...rest } = props;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ButtonWithMotion
          size="icon"
          variant="ghost"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          onClick={() => {
            onClick?.();
          }}
          className={
            active
              ? 'bg-secondary-main/20 font-semibold transition-colors hover:bg-secondary-main'
              : 'hover:bg-secondary-light/10'
          }
          data-active={active}
          aria-label={tip}
          {...rest}>
          <props.icon className="h-4 w-4" />
        </ButtonWithMotion>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tip}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ToolbarButton;
