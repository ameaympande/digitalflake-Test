import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Role name is required")
    .min(3, "Role name must be at least 3 characters long"),
});

const EditRole = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = location;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: state?.name || "",
      status: state?.status,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const body = {
        name: values.name,
        status: values.status,
      };

      try {
        const token = localStorage.getItem("token");
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URI}/api/v1/roles/${state?.id || id}`,
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          navigate("/roles", { state: { refresh: true } });
        }
      } catch (err) {
        console.error(
          err.message || "An error occurred while updating the user"
        );
      } finally {
        setLoading(false);
      }
    },
  });

  const handleCancel = () => {
    navigate("/roles");
  };

  return (
    <div className="flex justify-center h-[calc(100vh-6rem)] ml-64 mt-16">
      <div className="bg-white w-full h-auto flex flex-col rounded-[10px] shadow-md border border-gray-300 relative">
        <div className="flex p-4 items-center border-b border-gray-200">
          <div className="flex gap-4 items-center text-xl font-semibold">
            <ArrowLeft
              onClick={() => navigate("/roles")}
              className="hover:cursor-pointer"
            />
            <span>Edit Role</span>
          </div>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col p-8 space-y-4"
        >
          <div className="flex gap-16">
            <div className="flex flex-col w-[30%]">
              <label htmlFor="name" className="font-semibold mb-2">
                Role Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border rounded-lg px-3 py-2 bg-gray-50 border-gray-300 outline-none ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="Enter role name"
              />
              {formik.touched.name && formik.errors.name && (
                <span className="text-red-500 text-sm mt-1">
                  {formik.errors.name}
                </span>
              )}
            </div>

            <div className="flex flex-col w-[30%]">
              <label htmlFor="status" className="font-semibold mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border rounded-lg px-3 py-2 bg-gray-50 border-gray-300 outline-none"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 p-4 absolute bottom-0 right-0">
            <button
              type="button"
              onClick={handleCancel}
              className="py-2 px-6 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-6 bg-[#662671] text-white rounded-full hover:bg-[#541e5a]"
            >
              {loading ? "Updaing" : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRole;
