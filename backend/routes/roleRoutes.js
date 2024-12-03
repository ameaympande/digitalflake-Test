const express = require("express");
const router = express.Router();
const {
  getAllRoles,
  createNewRole,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");

const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);

router.get("/", getAllRoles);
router.post("/", createNewRole);
router.patch("/:id", updateRole);
router.delete("/:id", deleteRole);

module.exports = router;
