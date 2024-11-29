import { BriefcaseBusiness, ChevronRight, House, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[100%] text-white h-full fixed top-16 left-0 flex">
      <div className="flex items-center space-x-2"></div>
      <div className="bg-[#F4F4F4] w-52 mt-0 text-black p-4">
        <ul>
          <li>
            <div className="flex justify-between  hover:bg-purple-600 w-[100%] mt-6">
              <div>
                <Link to="/" className="block py-2 px-4 flex gap-6">
                  <House />
                  Home
                </Link>
              </div>
              <div className="py-2 ">
                <ChevronRight color="#000000" />
              </div>
            </div>
          </li>
          <li>
            <div className="flex justify-between  hover:bg-purple-600 w-[100%] mt-6">
              <div>
                <Link to="/roles" className="block py-2 px-4 flex gap-6">
                  <BriefcaseBusiness />
                  Roles
                </Link>
              </div>
              <div className="py-2 ">
                <ChevronRight color="#000000" />
              </div>
            </div>
          </li>
          <li>
            <div className="flex justify-between  hover:bg-purple-600 w-[100%] mt-6">
              <div>
                <Link
                  to="/users"
                  className=" py-2 px-4 hover:bg-purple-600 flex gap-6"
                >
                  <User />
                  Users
                </Link>
              </div>
              <div className="py-2 ">
                <ChevronRight color="#000000" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
