const mysql = require("mysql");

exports.createEmployee = async (req, res, next) => {
  try {
    const employee = req.body.employee;
    const contacts = req.body.contacts;

    if (!employee || !contacts) {
      return next(new Error("Please enter the fields"), 400);
    }

    // Insert employee into the database
    db.query("INSERT INTO employees SET ?", employee, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Error creating employee" });
      } else {
        const employeeId = result.insertId;
        const contactValues = contacts.map((contact) => [
          employeeId,
          ...Object.values(contact),
        ]);

        // Insert contacts into the database
        db.query(
          "INSERT INTO contacts (employee_id, full_name, phone_number, email, address, city, state, emergency_contact_name, relationship) VALUES ?",
          [contactValues],
          (err, result) => {
            if (err) {
              res
                .status(500)
                .json({ error: "Error creating employee contacts" });
            } else {
              res
                .status(201)
                .json({ message: "Employee created successfully" });
            }
          }
        );
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.listEmployee = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit;

  // Get employees with pagination
  db.query(
    "SELECT * FROM employees LIMIT ? OFFSET ?",
    [limit, offset],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: "Error listing employees" });
      } else {
        res.json({ employees: results });
      }
    }
  );
};

exports.getEmployee = async (req, res) => {
  const employeeId = req.params.id;

  // Get employee by ID
  db.query(
    "SELECT * FROM employees WHERE id = ?",
    [employeeId],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: "Error getting employee" });
      } else if (results.length === 0) {
        res.status(404).json({ error: "Employee not found" });
      } else {
        res.json({ employee: results[0] });
      }
    }
  );
};

exports.updateEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const employee = req.body.employee;

  // Update employee in the database
  db.query(
    "UPDATE employees SET ? WHERE id = ?",
    [employee, employeeId],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Error updating employee" });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: "Employee not found" });
      } else {
        res.json({ message: "Employee updated successfully" });
      }
    }
  );
};

exports.deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;

  // Delete employee from the database
  db.query(
    "DELETE FROM employees WHERE id = ?",
    [employeeId],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Error deleting employee" });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: "Employee not found" });
      } else {
        res.json({ message: "Employee deleted successfully" });
      }
    }
  );
};
