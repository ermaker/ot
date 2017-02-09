import update from 'immutability-helper';
import StateWeek from './StateWeek';
import StateDay from './StateDay';

const initialStateDay = new StateDay({
  items: {
    begin: {
      inputValue: undefined,
      defaultValue: '09:00'
    },
    finish: {
      inputValue: undefined,
      defaultValue: '18:00'
    },
    lunch: {
      inputValue: ''
    },
    dinner: {
      inputValue: '0',
      defaultValue: '0'
    },
    fitness: {
      inputValue: '0',
      defaultValue: '0'
    },
    extra: {
      inputValue: '0',
      defaultValue: '0'
    },
    final: {
      inputValue: '8',
      defaultValue: '8'
    }
  }
}).toState();

const initialStateWeek = new StateWeek({
  days: [],
  items: {
    final: {
      inputValue: '',
      defaultValue: '40'
    }
  }
});
Array.from(Array(5)).forEach(
  () => initialStateWeek.state.days.push(new StateDay(initialStateDay))
);

const initialState = initialStateWeek.update().toState();

const reducer = (state = initialState, action) => {
  if (process.env.NODE_ENV !== 'production')
    console.log(action);
  switch (action.type) {
    case 'CHANGE':
      const nextState = update(state, {
        days: { [action.ownProps.day_id]: { items: { [action.ownProps.name]:
                { inputValue: { $set: action.value }
      }}}}});
      return new StateWeek(nextState).update().toState();
    default:
      return state;
  }
};

export default reducer;
