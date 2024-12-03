import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URI}/api/v1/roles`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          const fetchedRoles = response.data.roles.map((role) => ({
            id: role.id,
            name: role.name,
            status: role.status,
          }));
          setRoles(fetchedRoles);
        }
      } catch (err) {
        console.error(err.message || "An error occurred while fetching roles");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return (
    <RoleContext.Provider value={{ roles, setRoles, loading }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRoles = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRoles must be used within a RoleProvider");
  }
  return context;
};
