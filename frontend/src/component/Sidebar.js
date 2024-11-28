import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[30%] text-white h-full fixed top-0 left-0">
      <div className="flex items-center space-x-2"></div>
      <div className="mt-24 bg-gray-300">
        <ul>
          <li>
            <Link to="/" className="block py-2 px-4 hover:bg-purple-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/roles" className="block py-2 px-4 hover:bg-purple-600">
              Roles
            </Link>
          </li>
          <li>
            <Link to="/users" className="block py-2 px-4 hover:bg-purple-600">
              Users
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
