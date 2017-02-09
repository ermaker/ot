import React from 'react';

const SelectedTime = ({options, inputValue, value, onChange}) => (
  <div>
    <select onChange={onChange} value={inputValue}>
      {
        options.map(option_ => (
          <option key={option_} value={option_}>{option_}</option>
        ))
      }
    </select>
    <span>{value}</span>
  </div>
);

export default SelectedTime;
