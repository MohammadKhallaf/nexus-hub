import ChatArea from '@/features/chat/_components/chat-area.component';
import ContactList from '@components/contact-list.component';
import Sidebar from '@components/sidebar.component';
import useSubscribeChat from '../features/chat/_hooks/use-subscribe-chat';

const App: React.FC = () => {
  useSubscribeChat('85b1590b-becb-411d-bbd4-39a76769e2b0');
  return (
    <div className="h-screen bg-gray-100">
      <div className="flex h-full flex-row gap-3 py-5">
        <Sidebar />

        {/* <ContactList /> */}
        <ChatArea />
      </div>{' '}
    </div>
  );
};

export default App;
