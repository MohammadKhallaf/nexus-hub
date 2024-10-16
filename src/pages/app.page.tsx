import ChatArea from '@/features/chat/_components/chat-area.component';
import ContactList from '@components/contact-list.component';
import Sidebar from '@components/sidebar.component';

const App: React.FC = () => {
  return (
    <div className="h-screen bg-gray-100">
      <div className="flex h-full flex-row gap-3 py-5">
        <Sidebar />

        <ContactList />
        <ChatArea />
      </div>{' '}
    </div>
  );
};

export default App;
