import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./component/Layout";
import Home from "./pages/Home";
import Roles from "./pages/roles/Roles";
import AddRole from "./pages/roles/AddRole";
import EditRole from "./pages/roles/EditRole";
import Users from "./pages/user/Users";
import AddUser from "./pages/user/AddUser";
import EditUser from "./pages/user/EditUser";
import { UserProvider } from "./context/userContext";
import { RoleProvider } from "./context/roleContext";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <RoleProvider>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="roles" element={<Roles />} />
              <Route path="roles/add" element={<AddRole />} />
              <Route path="roles/edit/:id" element={<EditRole />} />
              <Route path="users" element={<Users />} />
              <Route path="users/add" element={<AddUser />} />
              <Route path="users/edit/:id" element={<EditUser />} />
            </Route>
          </Route>

          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/" : "/login"} />}
          />
        </Routes>
      </UserProvider>
    </RoleProvider>
  );
};

export default App;
