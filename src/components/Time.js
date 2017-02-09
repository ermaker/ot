import 'rc-time-picker/assets/index.css';

import React from 'react';
import moment from 'moment';
import TimePicker from 'rc-time-picker';

const Time = ({inputValue, value, onChange}) => (
  <div>
    <TimePicker value={inputValue && moment(inputValue, 'HH:mm')}
      defaultOpenValue={value && moment(value, 'HH:mm')}
      showSecond={false} onChange={onChange} />
    <span>{value}</span>
  </div>
);

export default Time;
