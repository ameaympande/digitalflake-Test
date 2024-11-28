import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./component/Layout";
import Home from "./pages/Home";
import Roles from "./pages/Roles";
import Users from "./pages/Users";

const App = () => {
  const isLoggedIn = true;

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        {isLoggedIn ? (
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/users" element={<Users />} />
          </Route>
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </>
  );
};

export default App;
