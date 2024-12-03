import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const validationSchema = Yup.object({
  roleName: Yup.string()
    .required("Role name is required")
    .min(3, "Role name must be at least 3 characters long"),
});

const AddRole = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      roleName: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const body = {
        name: values.roleName,
        status: true,
      };
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${process.env.REACT_APP_API_URI}/api/v1/roles`,
          body,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 201) {
          navigate("/roles", { state: { refresh: true } });
        } else {
          throw new Error("Failed to delete role");
        }
      } catch (err) {
        console.error("Error deleting role:", err.message);
      }
    },
  });

  return (
    <div className="flex justify-center h-[calc(100vh-6rem)] ml-64 mt-16">
      <div className="bg-white w-full h-auto flex flex-col rounded-[10px] shadow-md border border-gray-300 relative">
        <div className="flex p-4 items-center border-b border-gray-200">
          <div className="flex gap-4 items-center text-xl font-semibold">
            <ArrowLeft
              onClick={() => navigate("/roles")}
              className="hover:cursor-pointer"
            />
            <span>Add Role</span>
          </div>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col p-8 space-y-4"
        >
          <div className="flex flex-col w-[30%]">
            <label htmlFor="roleName" className="font-semibold mb-2">
              Role Name
            </label>
            <input
              id="roleName"
              name="roleName"
              type="text"
              placeholder="Role Name..."
              value={formik.values.roleName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border rounded-lg px-3 py-2 bg-gray-50 border-gray-300 outline-none ${
                formik.touched.roleName && formik.errors.roleName
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.roleName && formik.errors.roleName && (
              <span className="text-red-500 text-sm mt-1">
                {formik.errors.roleName}
              </span>
            )}
          </div>

          <div className="flex justify-end space-x-4 p-4 absolute bottom-0 right-0">
            <button
              onClick={() => navigate("/roles")}
              className="py-2 px-6 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-6 bg-[#662671] text-white rounded-full hover:bg-[#541e5a]"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRole;
