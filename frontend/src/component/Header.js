import React, { useState, useRef, useEffect } from "react";
import { CircleUser, TriangleAlert } from "lucide-react";

const Header = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="bg-purple-700 text-white p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-20">
        <div className="flex items-center space-x-2">
          <img
            src={"./logo2.png"}
            alt="Logo"
            className="w-22 h-10 bg-cover bg-center"
          />
        </div>
        <div
          className="flex items-center space-x-6 cursor-pointer"
          onClick={togglePopup}
        >
          <CircleUser className="w-8 h-8" />
        </div>
      </div>

      {isPopupVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-30">
          <div
            ref={popupRef}
            className="bg-white p-6 shadow-lg w-96 rounded-xl"
          >
            <div className="flex gap-4 items-center justify-center">
              <TriangleAlert color="#E40613" size={32} />
              <span className="font-bold text-xl">Log Out</span>
            </div>
            <p className="mt-4 text-center text-gray-600">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                className="py-2 px-6 border border-gray-300 rounded-full text-gray-600"
                onClick={togglePopup}
              >
                Cancel
              </button>
              <button className="py-2 px-6 bg-[#662671] text-white rounded-full">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
