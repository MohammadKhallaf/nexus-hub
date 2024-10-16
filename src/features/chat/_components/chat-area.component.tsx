import { MoreVerticalIcon, PhoneIcon, VideoIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import InputEditor from '@components/input-editor';
import { useListMessage } from '../_hooks';
import MessageBubble from './message-bubble.component';

const ChatArea = () => {
  const { data } = useListMessage(import.meta.env.VITE_CHAT_ID as string);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [data]);

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
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible">
          <AnimatePresence initial={false}>
            {data?.map((message, index, messages) => (
              <MessageBubble
                key={message.id}
                {...message}
                ref={index === messages.length - 1 ? lastMessageRef : null}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </ScrollArea>
      <InputEditor />
    </div>
  );
};

export default ChatArea;
