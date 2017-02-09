import update from 'immutability-helper';
import moment from 'moment';
import StateTime from './StateTime';

class StateDay {
  constructor(state) {
    this.state = update(state, {items: {$apply: items => {
      let result = {};
      Object.keys(items).forEach(key =>
        result[key] = new StateTime(items[key]));
      return result;
    }}});
  }

  excludedTime() {
    return moment.duration()
      .add(Number(this.state.items.lunch.state.value), 'minutes')
      .add(Number(this.state.items.dinner.state.value), 'minutes')
      .add(Number(this.state.items.fitness.state.value), 'minutes')
      .add(Number(this.state.items.extra.state.value), 'minutes');
  }

  updateBegin() {
    let begin = this.state.items.begin;
    let finish = this.state.items.finish;
    let final = this.state.items.final;
    if (finish.state.inputValue && final.state.inputValue) {
      let beginTime =
        moment(finish.state.value, 'HH:mm')
          .subtract(Number(final.state.value), 'hours')
          .subtract(this.excludedTime());
      begin.state.defaultValue = beginTime.format('HH:mm');
    }
    begin.update();
  }

  updateFinish() {
    let begin = this.state.items.begin;
    let finish = this.state.items.finish;
    let final = this.state.items.final;
    if (begin.state.inputValue && final.state.inputValue) {
      let finishTime =
        moment(begin.state.value, 'HH:mm')
          .add(Number(final.state.value), 'hours')
          .add(this.excludedTime());
      finish.state.defaultValue = finishTime.format('HH:mm');
    }
    finish.update();
  }

  updateFinal() {
    let begin = this.state.items.begin;
    let finish = this.state.items.finish;
    let final = this.state.items.final;
    if (begin.state.inputValue && finish.state.inputValue) {
      let beginDuration = moment.duration(begin.state.value);
      let finishDuration = moment.duration(finish.state.value);
      let diffDuration = finishDuration
        .subtract(beginDuration)
        .subtract(this.excludedTime());
      final.state.defaultValue = diffDuration.asHours();
    }
    final.update();
  }

  updateLunch() {
    let begin = this.state.items.begin;
    let finish = this.state.items.finish;
    let final = this.state.items.final;
    let lunch = this.state.items.lunch;

    if (begin.state.inputValue && finish.state.inputValue) {
      let beginDuration = moment.duration(begin.state.value);
      let finishDuration = moment.duration(finish.state.value);
      let diff = finishDuration.subtract(beginDuration).asHours();

      if (diff <= 4)
        lunch.state.defaultValue = '0';
      else if (diff <= 8.5)
        lunch.state.defaultValue = '30';
      else
        lunch.state.defaultValue = '60';
    } else if (final.state.inputValue) {
      const diffDuration = moment.duration(Number(final.state.value), 'hours')
        .add(this.excludedTime())
        .subtract(Number(this.state.items.lunch.state.value), 'minutes');
      let diff = diffDuration.asHours();

      if (diff <= 4)
        lunch.state.defaultValue = '0';
      else if (diff < 8)
        lunch.state.defaultValue = '30';
      else
        lunch.state.defaultValue = '60';
    }

    lunch.update();
  }

  update() {
    Object.keys(this.state.items).forEach(
      key => this.state.items[key].update());
    this.updateLunch();
    this.updateBegin();
    this.updateFinish();
    this.updateFinal();
  }

  toState() {
    return update(this.state, {items: {$apply: items => {
      let result = {};
      Object.keys(items).forEach(key =>
        result[key] = items[key].toState());
      return result;
    }}});
  }
}

export default StateDay;
