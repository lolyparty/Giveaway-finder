import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-2xl font-bold py-2">Giveaway Finder</h1>
      <div className="flex items-center justify-items-center">
        <nav className="flex items-center justify-items-center">
          <ul className="flex space-x-4 ">
            <li>
              <Link to="/home" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/reservations" className="hover:underline">
                Reservations
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
