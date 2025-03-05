import React, { useState, useRef, useEffect } from 'react';
import { MalCategoryId } from '../../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

interface TriStateCheckboxProps {
  id: MalCategoryId;
  initialState: boolean | null;
  onChange: (id: MalCategoryId, state: boolean | null) => void;
}

const TriStateCheckbox: React.FC<TriStateCheckboxProps> = ({ id, initialState, onChange }) => {
  const [state, setState] = useState<boolean | null>(initialState); // null, true, false
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = false; // Remove default indeterminate state
    }
  }, [state]);

  const handleChange = () => {
    let newState: boolean | null;
    if (state === null) {
      newState = true;
    } else if (state === true) {
      newState = false;
    } else {
      newState = null;
    }
    setState(newState);
    onChange(id, newState); // Pass the new state and ID back
  };

  const getIcon = () => {
    if (state === true) {
      return <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />;
    } else if (state === false) {
      return <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />;
    } else {
      return null; // No icon for null state
    }
  };

  return (
    <div
      style={{
        width: '20px',
        height: '20px',
        border: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onClick={handleChange}
    >
      {getIcon()}
    </div>
  );
};

export default TriStateCheckbox;
