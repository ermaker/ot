import React from 'react';
import Day from './Day';
import FinalTime from '../containers/FinalTime';

import { Button } from 'semantic-ui-react';

const Week = ({days}) => {
  return (
    <div>
      { days.map((day, index) => <Day key={index} day_id={index} />) }
      <div>
        <h3>Final</h3>
        <FinalTime name={'final'} />
      </div>
      <Button>
        Click
      </Button>
    </div>
  );
};

export default Week;
