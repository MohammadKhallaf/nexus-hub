import ChatArea from '@components/chat-area.component';
import Sidebar from '@components/sidebar.component';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const App: React.FC = () => {
  return (
    <div className="h-screen bg-gray-100">
      <div className="flex h-full flex-row gap-3 py-5">
        <Sidebar />

        <div className="flex h-full w-72 shrink-0 flex-col items-center space-y-8 rounded-lg bg-white py-4 shadow-xl">
          <div className="w-full p-4">
            <Input type="text" placeholder="Search" className="w-full" />
          </div>
          <Tabs defaultValue="groups">
            <TabsList className="mx-2">
              <TabsTrigger value="groups" className="flex-1">
                Groups
              </TabsTrigger>
              <TabsTrigger value="people" className="flex-1">
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
        <ChatArea />
      </div>{' '}
    </div>
  );
};

export default App;
