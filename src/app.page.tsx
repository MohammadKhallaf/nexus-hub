import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

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
    <div className="flex h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <header className="bg-white p-4 shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">NexusHub Chat</h1>
      </header>

      <ScrollArea className="flex-grow p-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div
                className={`flex items-end ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={message.sender === 'user' ? '/user-avatar.png' : '/bot-avatar.png'}
                  />
                  <AvatarFallback>{message.sender === 'user' ? 'U' : 'B'}</AvatarFallback>
                </Avatar>
                <div
                  className={`mx-2 rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-800 dark:bg-gray-700 dark:text-white'
                  }`}>
                  <p>{message.text}</p>
                  <span className="mt-1 block text-xs text-gray-400">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollArea>

      <div className="bg-white p-4 shadow-lg dark:bg-gray-800">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-grow"
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default App;
