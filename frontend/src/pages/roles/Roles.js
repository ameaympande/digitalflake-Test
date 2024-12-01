import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTable, useSortBy } from "react-table";
import { Search, SquarePen, Trash2, TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Roles = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null); // Stores the role being edited or deleted
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

  const data = useMemo(
    () => [
      { id: 123, roleName: "Admin", status: "Active" },
      { id: 124, roleName: "Superadmin", status: "Inactive" },
      { id: 125, roleName: "Caller", status: "Inactive" },
      { id: 126, roleName: "Account", status: "Active" },
    ],
    []
  );

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Role Name",
        accessor: "roleName",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`${
              value === "Active" ? "text-green-500" : "text-red-500"
            }`}
          >
            {value}
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

  const handleEdit = (role) => {
    // Navigate to the edit page with the selected role data
    console.log("Edit Role: ", role);
    navigate(`/roles/edit/${role.id}`, { state: role });
  };

  const handleDeletePopup = (role) => {
    setSelectedRole(role);
    togglePopup();
  };

  const handleDeleteConfirm = () => {
    // Perform delete action here
    console.log("Deleting Role: ", selectedRole);
    setSelectedRole(null);
    togglePopup();
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
              <img
                src="https://s3-alpha-sig.figma.com/img/2588/b462/bf3f810f9d10a4876639928b0c9f536e?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S8gtJ2p0uqU3IqNe7FYNYz-gxcXZTm45nXSek~5DSnsSd9TVSpZItGt9dkFwGr9g2qch4H~udWYarwcvNQ99~-9BbVBlV8Yoxiy8q7XM3VRs5ayLnrOKMPN5U8xjrcueNbCCNordPMU9HRTUMeU0QnhjEf6DC7ptmp-95En0IvRCbItxRsuKMwNr11-WJX~X1w-oXmJDYnVXC6D8Eoi-~pdyHBYAE4JlB6r8FBwVPPiv~j99EBPYii~yRCZe-izEQsvNpxtbplArhqtZArx0ovlWN37LQrIbOCZVH9q-EuRgUCn0p4EEeuPpUt7IdYL~4vGTZ-MwvbLDGMEPyBv0dg__"
                alt="Briefcase Image"
                className="w-8 h-8"
              />
              <span>Roles</span>
            </div>
            <div className="flex ml-8 items-center border rounded-lg px-3 bg-gray-50 border-gray-300 w-[40%]">
              <Search size={20} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                        className="border border-gray-300 p-2 text-center"
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
                          className="border border-gray-300 p-2 text-center"
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
              Are you sure you want to delete the role{" "}
              <span className="font-semibold">{selectedRole?.roleName}</span>?
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

export default Roles;
