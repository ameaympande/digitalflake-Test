import React from "react";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-6rem)] ml-64 mt-16">
      <div className="bg-white w-full h-full flex flex-col items-center justify-center rounded-[10px] shadow-md border border-gray-300">
        <div
          className="flex justify-center items-center w-[250px] h-[128px] bg-cover bg-center mx-auto mb-4"
          style={{ backgroundImage: "url('/logo.png')" }}
        ></div>
        <p className="text-gray-600 text-sm mt-1 text-center">
          Welcome to Digitalflake admin
        </p>
      </div>
    </div>
  );
};

export default Home;
