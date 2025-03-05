import React from 'react';
import { Form } from 'react-bootstrap';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { malCategories } from '../../../constants';
import { MalCategoryId } from '../../../types';
import { FilterChange } from '../../../types';

interface GenreInputProps {
  includedGenres: MalCategoryId[];
  excludedGenres: MalCategoryId[];
  onChange: (filterChange: FilterChange) => void;
}

const GenreInput: React.FC<GenreInputProps> = ({ includedGenres, excludedGenres, onChange }) => {
  const getCheckboxValue = (id: MalCategoryId): boolean | null => {
    if (includedGenres.includes(id)) return true;
    if (excludedGenres.includes(id)) return false;
    return null;
  };

  const handleCheckboxChange = (id: MalCategoryId, value: boolean | null) => {
    let newIncluded = [...includedGenres];
    let newExcluded = [...excludedGenres];

    if (value === true) {
      newIncluded.push(id);
      newExcluded = newExcluded.filter(g => g !== id);
    } else if (value === false) {
      newExcluded.push(id);
      newIncluded = newIncluded.filter(g => g !== id);
    } else {
      newIncluded = newIncluded.filter(g => g !== id);
      newExcluded = newExcluded.filter(g => g !== id);
    }

    onChange({ key: 'includedGenres', value: newIncluded });
    onChange({ key: 'excludedGenres', value: newExcluded });
  };

  return (
    <>
      {Object.entries(malCategories).map(([id, name]) => (
        <div key={id} className="mb-3 d-flex align-items-center">
        <TriStateCheckbox
          value={getCheckboxValue(Number(id) as MalCategoryId)}
          onChange={(e) => handleCheckboxChange(Number(id) as MalCategoryId, e.value as boolean | null)}
        />
        <Form.Label className="ms-2 mb-0">{name}</Form.Label>
      </div>    
      ))}
    </>
  );
  return (
    <>
        {Object.entries(malCategories).map(([id, name]) => (
            <Form.Group key={id} className="mb-3 d-flex align-items-center">
                <TriStateCheckbox
                    value={getCheckboxValue(Number(id) as MalCategoryId)}
                    onChange={(e) => handleCheckboxChange(Number(id) as MalCategoryId, e.value as boolean | null)}
                />
                <Form.Label className="ms-2 mb-0">{name}</Form.Label>
            </Form.Group>
        ))}
    </>
);
};

export default GenreInput;
