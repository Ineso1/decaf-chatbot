import { Text } from '@vercel/examples-ui';
import { FaUserCircle } from 'react-icons/fa';

function Header() {
  return (
    <header className="bg-gray-200 py-4 px-8 flex justify-between items-center">
      <div>
        {/* Logo */}
        <Text variant="h1">Decaf</Text>
      </div>

      <div className="flex items-center">
        {/* My Account */}
        <a href="#" className="mr-4">
          <FaUserCircle size={24} />
        </a>

      </div>
    </header>
  );
}

export default Header;