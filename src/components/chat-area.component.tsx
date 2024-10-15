import { MoreVerticalIcon, PhoneIcon, VideoIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

import InputEditor from './input-editor';

const ChatArea = () => {
  return (
    <div className="flex flex-grow flex-col rounded-l-lg shadow-lg">
      <div className="flex items-center justify-between rounded-tl-lg border-b bg-white p-4">
        <div className="flex items-center">
          <Avatar className="mr-3">
            <AvatarImage src="/anil-avatar.jpg" alt="Anil" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">Anil</h2>
            <p className="text-sm text-muted-foreground">Online - Last seen, 2:02pm</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" aria-label="Phone call">
            <PhoneIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Video call">
            <VideoIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="More options">
            <MoreVerticalIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          <div className="flex flex-col items-start">
            <div className="max-w-[70%] rounded-lg bg-secondary p-3">
              <p>Hey There!</p>
            </div>
            <span className="mt-1 text-xs text-muted-foreground">Today, 8:30pm</span>
          </div>
          <div className="flex flex-col items-end">
            <div className="max-w-[70%] rounded-lg bg-primary p-3 text-primary-foreground">
              <p>Hello!</p>
            </div>
            <span className="mt-1 text-xs text-muted-foreground">Today, 8:33pm</span>
          </div>
        </div>
      </ScrollArea>
      <InputEditor />
    </div>
  );
};

export default ChatArea;
