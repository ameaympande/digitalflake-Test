const Role = require("../model/Role");

// Get all roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json({ roles });
  } catch (err) {
    console.error("Error fetching roles:", err.message);
    res.status(500).json({ message: "Failed to fetch roles" });
  }
};

// Create a new role
const createNewRole = async (req, res) => {
  const { name, status } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Role name is required" });
  }

  try {
    const latestRole = await Role.findOne().sort({ id: -1 });
    const newId = latestRole ? latestRole.id + 1 : 1;

    const newRole = new Role({ id: newId, name, status });
    await newRole.save();

    res
      .status(201)
      .json({ message: "Role created successfully", role: newRole });
  } catch (err) {
    console.error("Error creating role:", err.message);
    res.status(500).json({ message: "Failed to create role" });
  }
};

// Update an existing role
const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;

  if (!name && status === undefined) {
    return res.status(400).json({
      message: "At least one field (name or status) must be provided",
    });
  }

  try {
    const updatedRole = await Role.findOneAndUpdate(
      { id },
      { $set: { name, status } },
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res
      .status(200)
      .json({ message: "Role updated successfully", role: updatedRole });
  } catch (err) {
    console.error("Error updating role:", err.message);
    res.status(500).json({ message: "Failed to update role" });
  }
};

// Delete a role
const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRole = await Role.findOneAndDelete({ id });

    if (!deletedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ message: "Role deleted successfully" });
  } catch (err) {
    console.error("Error deleting role:", err.message);
    res.status(500).json({ message: "Failed to delete role" });
  }
};

module.exports = {
  getAllRoles,
  createNewRole,
  updateRole,
  deleteRole,
};
