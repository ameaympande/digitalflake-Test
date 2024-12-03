import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTable, useSortBy } from "react-table";
import { Search, SquarePen, Trash2, TriangleAlert } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUsers } from "../../context/userContext";
import debounce from "lodash.debounce";
import axios from "axios";

const Users = () => {
  const navigate = useNavigate();
  const { users, setUsers, loading } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const popupRef = useRef(null);
  const location = useLocation();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URI}/api/v1/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setUsers(response.data.users);
      }
    } catch (err) {
      console.error(err.message || "Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.refresh) {
      fetchUsers();
    }
  }, [location.state]);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleSearchChange = debounce((e) => {
    setSearchTerm(e.target.value);
  }, 300);

  const filteredData = useMemo(() => {
    if (!searchTerm) return users;
    return users.filter((user) => {
      return Object.values(user)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  }, [users, searchTerm]);

  const columns = useMemo(
    () => [
      { Header: "Id", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Mobile", accessor: "mob_no" },
      { Header: "Email-id", accessor: "email" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span className={value ? "text-green-500" : "text-red-500"}>
            {value ? "Active" : "Inactive"}
          </span>
        ),
      },

      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="flex gap-4 justify-center">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => handleEdit(row.original)}
            >
              <SquarePen size={24} />
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDeletePopup(row.original)}
            >
              <Trash2 size={24} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const handleEdit = (user) => {
    navigate(`/users/edit/${user.id}`, { state: user });
  };

  const handleDeletePopup = (user) => {
    setSelectedUser(user);
    togglePopup();
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== selectedUser?.id)
      );

      const response = await axios.delete(
        `${process.env.REACT_APP_API_URI}/api/v1/users/${selectedUser?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("User deleted successfully:", response.data);
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (err) {
      console.error(
        err.message || "An error occurred while deleting the user."
      );

      setUsers((prevUsers) => [...prevUsers, selectedUser]);
    } finally {
      setLoading(false);
      togglePopup();
    }
  };

  const tableInstance = useTable({ columns, data: filteredData }, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <div className="flex justify-center h-[calc(100vh-6rem)] ml-64 mt-16">
        <div className="bg-white w-full h-auto flex flex-col rounded-[10px] shadow-md border border-gray-300">
          <div className="flex p-4 items-center border-b border-gray-200">
            <div className="flex gap-4 items-center text-xl font-semibold">
              <span>Users</span>
            </div>
            <div className="flex ml-8 items-center border rounded-lg px-3 bg-gray-50 border-gray-300 w-[40%]">
              <Search size={20} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                onChange={handleSearchChange}
                className="w-full outline-none bg-transparent ml-2 p-2"
              />
            </div>
            <button
              onClick={() => navigate("/users/add")}
              className="ml-auto bg-[#662671] text-white px-4 py-2 rounded hover:bg-[#541e5a]"
            >
              Add New
            </button>
          </div>
          <div className="p-4">
            {loading ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : (
              <table
                {...getTableProps()}
                className="w-full border-collapse border border-gray-200"
              >
                <thead className="bg-yellow-200">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          className="border p-2 text-center"
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} className="hover:bg-gray-100">
                        {row.cells.map((cell) => (
                          <td
                            {...cell.getCellProps()}
                            className="border p-2 text-center"
                          >
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                  {rows.length === 0 && (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="text-center p-4 text-gray-500"
                      >
                        No results found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
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
              <span className="font-bold text-xl">Delete</span>
            </div>
            <p className="mt-4 text-center text-gray-600">
              Are you sure you want to delete the user{" "}
              <span className="font-semibold">{selectedUser?.name}</span>?
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                className="py-2 px-6 border border-gray-300 rounded-full text-gray-600"
                onClick={togglePopup}
              >
                Cancel
              </button>
              <button
                className="py-2 px-6 bg-[#662671] text-white rounded-full"
                onClick={handleDeleteConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
