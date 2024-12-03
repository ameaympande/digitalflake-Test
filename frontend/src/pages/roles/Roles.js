import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTable, useSortBy } from "react-table";
import { Search, SquarePen, Trash2, TriangleAlert } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRoles } from "../../context/roleContext";
import axios from "axios";
import debounce from "lodash.debounce";

const Roles = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roles, setRoles, loading, setLoading } = useRoles();
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const popupRef = useRef(null);

  const fetchRoles = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URI}/api/v1/roles`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) setRoles(response.data.roles);
    } catch (error) {
      console.error("Error fetching roles:", error.message);
    }
  };

  useEffect(() => {
    if (location.state?.refresh) {
      fetchRoles();
    }
  }, [location.state]);

  const togglePopup = () => setPopupVisible(!isPopupVisible);

  const handleSearchChange = debounce(
    (e) => setSearchTerm(e.target.value),
    300
  );

  const filteredData = useMemo(() => {
    if (!searchTerm) return roles;
    return roles.filter((role) =>
      Object.values(role)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [roles, searchTerm]);

  const columns = useMemo(
    () => [
      { Header: "Id", accessor: "id" },
      { Header: "Role Name", accessor: "name" },
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

  const handleEdit = (role) =>
    navigate(`/roles/edit/${role.id}`, { state: role });

  const handleDeletePopup = (role) => {
    setSelectedRole(role);
    togglePopup();
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URI}/api/v1/roles/${selectedRole?.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setRoles((prevRoles) =>
          prevRoles.filter((role) => role.id !== selectedRole?.id)
        );
        console.log("Role deleted successfully");
      } else {
        throw new Error("Failed to delete role");
      }
    } catch (err) {
      console.error("Error deleting role:", err.message);
    } finally {
      togglePopup();
    }
  };

  const tableInstance = useTable({ columns, data: filteredData }, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <div className="flex justify-center h-[calc(100vh-6rem)] ml-64 mt-16">
        <div className="bg-white w-full flex flex-col rounded shadow-md border border-gray-300">
          <div className="flex p-4 items-center border-b border-gray-200">
            <span className="text-xl font-semibold">Roles</span>
            <div className="ml-8 flex items-center border rounded-lg px-3 bg-gray-50 w-[40%]">
              <Search size={20} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                onChange={handleSearchChange}
                className="w-full outline-none bg-transparent ml-2 p-2"
              />
            </div>
            <button
              onClick={() => navigate("/roles/add")}
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
                      {headerGroup.headers.map((column) => {
                        const { getHeaderProps, getSortByToggleProps } = column;
                        const columnProps = getHeaderProps(
                          getSortByToggleProps()
                        );
                        return (
                          <th
                            key={column.id}
                            {...columnProps}
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
                        );
                      })}
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
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div
            ref={popupRef}
            className="bg-white p-6 shadow-lg w-96 rounded-xl"
          >
            <div className="flex gap-4 items-center justify-center">
              <TriangleAlert color="#E40613" size={32} />
              <span className="font-bold text-xl">Delete</span>
            </div>
            <p className="mt-4 text-center">
              Are you sure you want to delete the role{" "}
              <span className="font-semibold">{selectedRole?.name}</span>?
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                className="py-2 px-6 border border-gray-300 rounded-full"
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

export default Roles;
