import React from 'react';

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
    <div className="d-flex justify-content-between align-items-center">
        <label>{label}</label>
        <input
            type="checkbox"
            name={label}
            checked={isSelected}
            onChange={onCheckboxChange}
            
        />
    </div>
);

export default Checkbox;