import React from "react";
import Layout from "../component/Layout";

const Home = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen z-30">
        <h1 className="text-3xl font-bold text-gray-800">Home</h1>
        <p className="mt-4 text-gray-600">Welcome to your admin dashboard!</p>
      </div>
    </>
  );
};

export default Home;
