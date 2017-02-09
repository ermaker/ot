import update from 'immutability-helper';

class StateTime {
  constructor(state) {
    this.state = Object.assign({}, state);
  }

  update() {
    if (this.state.inputValue)
      this.state.value = this.state.inputValue;
    else
      this.state.value = this.state.defaultValue;
  }

  toState() {
    return Object.assign({}, this.state);
  }
}

export default StateTime;
