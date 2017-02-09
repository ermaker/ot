import React from 'react';

const ManualTime = ({inputValue, value, onChange}) => (
  <div>
    <input onChange={onChange} value={inputValue} />
    <span>{value}</span>
  </div>
);

export default ManualTime;
