import React, { useState } from "react";
import { Form, Badge, Button } from "react-bootstrap";

interface StaffInputProps {
  onChange: (staff: string[]) => void; // Callback to pass updated staff list
}

const StaffInput: React.FC<StaffInputProps> = ({ onChange }) => {
  const [staff, setStaff] = useState<string[]>([]); // List of added staff members
  const [staffInput, setStaffInput] = useState<string>(""); // Current input value

  const handleAddStaff = () => {
    if (staffInput.trim() && !staff.includes(staffInput)) {
      const updatedStaff = [...staff, staffInput.trim()];
      setStaff(updatedStaff);
      onChange(updatedStaff); // Notify parent about the change
      setStaffInput(""); // Clear input field after adding
    }
  };

  const handleRemoveStaff = (name: string) => {
    const updatedStaff = staff.filter((member) => member !== name);
    setStaff(updatedStaff);
    onChange(updatedStaff); // Notify parent about the change
  };

  return (
    <div>
      <h6>Staff</h6>
      {/* Input Field */}
      <Form.Control
        placeholder="Add staff member"
        type="text"
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
              className="text-white ms-1"
              size="sm"
              variant="link"
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
