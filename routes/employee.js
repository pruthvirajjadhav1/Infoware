const express = require("express");
const router = express.Router();

const {
  createEmployee,
  listEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

router.route("/employee").post(createEmployee);
router.route("/employee").get(listEmployee);
router.route("/employee/:id").get(getEmployee);
router.route("/employee/:id").put(updateEmployee);
router.route("/employee/:id").delete(deleteEmployee);

module.exports = router;
