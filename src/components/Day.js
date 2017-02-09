import React from 'react';
import Time from '../containers/Time';
import ManualTime from '../containers/ManualTime';
import SelectedTime from '../containers/SelectedTime';

const Day = ({day_id}) => (
  <div>
    <div>
      <h3>Day {day_id}</h3>
      <Time day_id={day_id} name={'begin'} />
      <Time day_id={day_id} name={'finish'} />
      <SelectedTime day_id={day_id} name={'lunch'}
        options={['', '0', '10', '30', '60']} />
      <SelectedTime day_id={day_id} name={'dinner'}
        options={['0', '10', '30']} />
      <SelectedTime day_id={day_id} name={'fitness'}
        options={['0', '10', '20', '30', '40', '50', '60',
          '70', '80', '90', '100', '110', '120', '130', '140']} />
      <ManualTime day_id={day_id} name={'extra'} />
      <ManualTime day_id={day_id} name={'final'} />
    </div>
  </div>
);

export default Day;
