import React from "react";
import { CircleUser } from "lucide-react";

const Header = () => {
  return (
    <div className="bg-purple-700 text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img
          src={"./logo2.png"}
          alt="Logo"
          className="w-22 h-10 bg-cover bg-center"
        />
      </div>
      <div className="flex items-center space-x-6">
        <CircleUser className="w-8 h-8" />
      </div>
    </div>
  );
};

export default Header;
