import React from 'react';

const Range = ({ label, value, onRangeChange }) => (
    <div className="d-flex justify-content-between align-items-center">
        <label>{label}</label>
        <input
            type="range"
            name={label}
            value={value}
            onChange={onRangeChange}
        />
    </div>
);

export default Range;