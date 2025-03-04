import React, { useState } from "react";
import { Form, Badge, Button } from "react-bootstrap";

import { FilterChange } from "../../../types";

interface StaffInputProps {
  staff: string[];
  onChange: (filterChange: FilterChange) => void;
}

const StaffInput: React.FC<StaffInputProps> = ({ staff, onChange }) => {
  const [staffInput, setStaffInput] = useState<string>("");

  const handleAddStaff = () => {
    if (staffInput.trim() && !staff.includes(staffInput)) {
      const updatedStaff = [...staff, staffInput.trim()];
      onChange({ key: "staff", value: updatedStaff });
      setStaffInput("");
    }
  };

  const handleRemoveStaff = (name: string) => {
    const updatedStaff = staff.filter((member) => member !== name);
    onChange({ key: "staff", value: updatedStaff });
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
