import update from 'immutability-helper';
import StateDay from './StateDay';
import StateTime from './StateTime';

class StateWeek {
  constructor(state) {
    this.state = update(state, {
      days: {$apply: days =>
        days.map(day => new StateDay(day))},
      items: {$apply: items => {
        let result = {};
        Object.keys(items).forEach(key =>
          result[key] = new StateTime(items[key]));
        return result;
      }}
    });
  }

  updateFinal() {
    let final = this.state.days.reduce((r, day) =>
      r + Number(day.state.items.final.state.value),
    0)
    this.state.items.final.state.defaultValue = String(final);
    this.state.items.final.update();
  }

  update() {
    this.state.days.forEach(day => day.update());
    Object.keys(this.state.items).forEach(
      key => this.state.items[key].update());
    this.updateFinal();
    return this;
  }

  toState() {
    return update(this.state, {
      days: {$apply: days =>
        days.map(day => day.toState())},
      items: {$apply: items => {
        let result = {};
        Object.keys(items).forEach(key =>
          result[key] = items[key].toState());
        return result;
      }}
    });
  }
}

export default StateWeek;
