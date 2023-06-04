import { Chat } from '../components/Chat';
import Contacts from '../components/Contacts';
import { Cookies } from "react-cookie";

function Home() {
  const cookies = new Cookies();
  const walletAddress = cookies.get("walletAddress");
  return (
    <div className="bg-slate-900 flex flex-col h-screen">
      <main className="flex flex-grow">
        <aside className="flex flex-col items-center bg-slate-900 py-4 px-4 w-full md:w-1/4 h-full">
          <div className="fixed top-0 h-full">
            <Contacts />
          </div>
        </aside>
        <section className="flex flex-grow bg-white py-4 px-8 relative z-10 rounded-3xl h-full w-full items-end overflow-auto">
          <Chat />
        </section>
      </main>
    </div>
  );
}

export default Home;
