import {
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  HomeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import {
  BellIcon,
  // HomeIcon,
  ImageIcon,
  MicIcon,
  MoreVerticalIcon,
  PaperclipIcon,
  PhoneIcon,
  SmileIcon,
  VideoIcon,
} from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const menuItems = [
  { icon: HomeIcon, text: 'Dashboard', path: '/' },
  { icon: ChatBubbleLeftRightIcon, text: 'Chat', path: '/chat' },
  { icon: UserCircleIcon, text: 'Profile', path: '/profile' },
  { icon: Cog6ToothIcon, text: 'Settings', path: '/settings' },
];

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! I'm a bot response.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex w-16 flex-col items-center space-y-8 bg-purple-600 py-4">
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
      {/* Chat List */}
      <div className="w-80 border-r bg-white">
        <div className="p-4">
          <Input type="text" placeholder="Search" className="w-full" />
        </div>
        <Tabs defaultValue="groups">
          <TabsList className="w-full">
            <TabsTrigger value="groups" className="w-1/2">
              Groups
            </TabsTrigger>
            <TabsTrigger value="people" className="w-1/2">
              People
            </TabsTrigger>
          </TabsList>
          <TabsContent value="groups">
            <ScrollArea className="h-[calc(100vh-120px)]">
              {/* Group list items */}
              {/* Repeat this structure for each group */}
              <div className="flex items-center p-4 hover:bg-gray-100">
                <Avatar className="mr-3 h-12 w-12">
                  <AvatarImage src="/group-avatar.jpg" />
                  <AvatarFallback>FF</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <h3 className="font-semibold">Friends Forever</h3>
                  <p className="text-sm text-gray-500">Hahahahah!</p>
                </div>
                <div className="text-xs text-gray-400">Today, 9:52pm</div>
                <Badge className="ml-2">4</Badge>
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="people">
            <ScrollArea className="h-[calc(100vh-120px)]">
              {/* People list items */}
              {/* Similar structure as groups, but for individual people */}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
      {/* Chat Area */}
      <div className="flex flex-grow flex-col">
        <div className="flex items-center justify-between border-b bg-white p-4">
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
        <div className="border-t bg-white p-4">
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
    </div>
  );
};

export default App;
