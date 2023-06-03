import { Chat } from '../components/Chat';
import Contacts from '../components/Contacts';
import Header from '../components/Header';

function Home() {
  return (
    <div className="bg-slate-900 flex flex-col h-screen">
      {/* <Header /> */}
      <main className="flex flex-grow">
        <aside className="bg-slate-900 py-4">
          <Contacts />
        </aside>

        <section className="flex-grow bg-white py-4 px-8 relative z-10 rounded-3xl">
          <Chat />
        </section>
      </main>
    </div>
  );
}

export default Home;
