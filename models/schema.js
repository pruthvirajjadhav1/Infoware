const createSchema = `
CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  job_title VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  primary_emergency_contact VARCHAR(255) NOT NULL,
  primary_emergency_contact_phone VARCHAR(20) NOT NULL,
  primary_emergency_contact_relationship VARCHAR(255) NOT NULL,
  secondary_emergency_contact VARCHAR(255) NOT NULL,
  secondary_emergency_contact_phone VARCHAR(20) NOT NULL,
  secondary_emergency_contact_relationship VARCHAR(255) NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);
`;

module.exports = { createSchema };
