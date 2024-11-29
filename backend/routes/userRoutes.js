const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);

router.get("/", getAllUsers);
router.post("/", createNewUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
