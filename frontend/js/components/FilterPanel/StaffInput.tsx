import React, { useState } from "react";
import { Form, Badge, Button } from "react-bootstrap";

const StaffInput = () => {
  const [staff, setStaff] = useState<string[]>([]); // List of added staff members
  const [staffInput, setStaffInput] = useState<string>(""); // Current input value

  const handleAddStaff = () => {
    if (staffInput.trim() && !staff.includes(staffInput)) {
      setStaff([...staff, staffInput.trim()]);
      setStaffInput(""); // Clear input field after adding
    }
  };

  const handleRemoveStaff = (name: string) => {
    setStaff(staff.filter((member) => member !== name));
  };

  return (
    <div>
      <h6>Staff</h6>
      {/* Input Field */}
      <Form.Control
        type="text"
        placeholder="Add staff member"
        value={staffInput}
        onChange={(e) => setStaffInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            handleAddStaff();
          }
        }}
      />

      {/* Display Added Staff Members */}
      <div className="mt-2">
        {staff.map((member) => (
          <Badge key={member} bg="primary" className="me-2">
            {member}
            <Button
              variant="link"
              size="sm"
              className="text-white ms-1"
              onClick={() => handleRemoveStaff(member)}
            >
              &times;
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default StaffInput;
