import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./component/Layout";
import Home from "./pages/Home";
import Roles from "./pages/roles/Roles";
import Users from "./pages/user/Users";
import AddRole from "./pages/roles/AddRole";
import EditRole from "./pages/roles/EditRole";
import { useEffect } from "react";
import AddUser from "./pages/user/AddUser";
import EditUser from "./pages/user/EditUser";

const App = () => {
  let isLoggedIn = true;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) isLoggedIn = true;
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        {isLoggedIn ? (
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/roles/add" element={<AddRole />} />
            <Route path="/roles/edit/:id" element={<EditRole />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/add" element={<AddUser />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
          </Route>
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </>
  );
};

export default App;
