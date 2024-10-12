import {
  ImageIcon,
  MicIcon,
  MoreVerticalIcon,
  PaperclipIcon,
  PhoneIcon,
  SmileIcon,
  VideoIcon,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

const ChatArea = () => {
  return (
    <div className="flex flex-grow flex-col rounded-l-lg shadow-lg">
      <div className="flex items-center justify-between rounded-tl-lg border-b bg-white p-4">
        <div className="flex items-center">
          <Avatar className="mr-3 h-10 w-10">
            <AvatarImage src="/anil-avatar.jpg" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">Anil</h2>
            <p className="text-sm text-gray-500">Online - Last seen, 2:02pm</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <PhoneIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <VideoIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVerticalIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-grow p-4">
        {/* Chat messages */}
        <div className="space-y-4">
          <div className="flex flex-col items-start">
            <div className="max-w-[70%] rounded-lg bg-gray-200 p-3">
              <p>Hey There!</p>
            </div>
            <span className="mt-1 text-xs text-gray-400">Today, 8:30pm</span>
          </div>
          <div className="flex flex-col items-end">
            <div className="max-w-[70%] rounded-lg bg-purple-600 p-3 text-white">
              <p>Hello!</p>
            </div>
            <span className="mt-1 text-xs text-gray-400">Today, 8:33pm</span>
          </div>
          {/* More messages... */}
        </div>
      </ScrollArea>
      <div className="rounded-bl-lg border-t bg-white p-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <PaperclipIcon className="h-5 w-5" />
          </Button>
          <Input type="text" placeholder="Type your message here..." className="flex-grow" />
          <Button variant="ghost" size="icon">
            <SmileIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Button size="icon" className="bg-purple-600 text-white">
            <MicIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
