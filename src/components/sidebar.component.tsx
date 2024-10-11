import {
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  HomeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { BellIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  return (
    <div className="flex h-full w-10 shrink-0 flex-col items-center space-y-8 rounded-r-lg bg-tertiary-dark py-4 shadow-xl md:w-16">
      <Avatar className="h-10 w-10">
        <AvatarImage src="/user-avatar.jpg" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <Button variant="ghost" size="icon" className="text-white">
        <HomeIcon className="h-6 w-6" />
      </Button>
      <Button variant="ghost" size="icon" className="text-white">
        <ChatBubbleLeftRightIcon className="h-6 w-6" />
      </Button>
      <Button variant="ghost" size="icon" className="text-white">
        <BellIcon className="h-6 w-6" />
      </Button>
      <Button variant="ghost" size="icon" className="text-white">
        <Cog6ToothIcon className="h-6 w-6" />
      </Button>
      <div className="flex-grow" />
      <Button variant="ghost" size="icon" className="text-white">
        <UserCircleIcon className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Sidebar;
