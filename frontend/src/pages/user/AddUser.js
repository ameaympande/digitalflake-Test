import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  role: Yup.string().required("Role is required"),
  profile_picture: Yup.mixed().required("Profile picture is required"),
  status: Yup.string().required("Status is required"),
});

const AddUser = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      email: "",
      role: "",
      profile_picture: null, // For file input
      status: "Active",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Submitted Values:", values);
      alert("User Added Successfully!");
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue("profile_picture", event.currentTarget.files[0]);
  };

  return (
    <div className="flex justify-center h-[calc(100vh-6rem)] ml-64 mt-16">
      <div className="bg-white w-full h-auto flex flex-col rounded-[10px] shadow-md border border-gray-300 relative">
        <div className="flex p-4 items-center border-b border-gray-200">
          <div className="flex gap-4 items-center text-xl font-semibold">
            <ArrowLeft
              onClick={() => navigate("/users")}
              className="hover:cursor-pointer"
            />
            <span>Add User</span>
          </div>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="flex gap-4 p-8 space-y-4"
        >
          <div className="flex flex-col w-[30%]">
            <label htmlFor="name" className="font-semibold mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Full Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border rounded-lg px-3 py-2 bg-gray-50 border-gray-300 outline-none ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.name && formik.errors.name && (
              <span className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </span>
            )}
          </div>

          <div className="flex flex-col w-[30%]">
            <label htmlFor="mobile" className="font-semibold mb-2">
              Mobile
            </label>
            <input
              id="mobile"
              name="mobile"
              type="text"
              placeholder="Mobile Number"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border rounded-lg px-3 py-2 bg-gray-50 border-gray-300 outline-none ${
                formik.touched.mobile && formik.errors.mobile
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <span className="text-red-500 text-sm mt-1">
                {formik.errors.mobile}
              </span>
            )}
          </div>

          <div className="flex flex-col w-[30%]">
            <label htmlFor="email" className="font-semibold mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border rounded-lg px-3 py-2 bg-gray-50 border-gray-300 outline-none ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </span>
            )}
          </div>

          <div className="flex flex-col w-[30%]">
            <label htmlFor="role" className="font-semibold mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border rounded-lg px-3 py-2 bg-gray-50 border-gray-300 outline-none ${
                formik.touched.role && formik.errors.role
                  ? "border-red-500"
                  : ""
              }`}
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <span className="text-red-500 text-sm mt-1">
                {formik.errors.role}
              </span>
            )}
          </div>

          <div className="flex flex-col w-[30%]">
            <label htmlFor="profile_picture" className="font-semibold mb-2">
              Profile Picture
            </label>
            <input
              id="profile_picture"
              name="profile_picture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={`border rounded-lg px-3 py-2 bg-gray-50 border-gray-300 outline-none ${
                formik.touched.profile_picture && formik.errors.profile_picture
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.profile_picture &&
              formik.errors.profile_picture && (
                <span className="text-red-500 text-sm mt-1">
                  {formik.errors.profile_picture}
                </span>
              )}
            <p className="text-xs text-gray-500 mt-1">
              Upload Maximum allowed file size is 10MB
            </p>
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
              className={`border rounded-lg px-3 py-2 bg-gray-50 border-gray-300 outline-none ${
                formik.touched.status && formik.errors.status
                  ? "border-red-500"
                  : ""
              }`}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {formik.touched.status && formik.errors.status && (
              <span className="text-red-500 text-sm mt-1">
                {formik.errors.status}
              </span>
            )}
          </div>

          <div className="flex justify-end space-x-4 p-4 absolute bottom-0 right-0">
            <button
              onClick={() => navigate("/users")}
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

export default AddUser;