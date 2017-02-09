import React from 'react';
import { connect } from 'react-redux';
import Time from '../components/Time';
import { change } from '../actions';

const mapStateToProps = (state, ownProps) =>
  state.days[ownProps.day_id].items[ownProps.name];

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: value => dispatch(
              change({ownProps, value: value && value.format('HH:mm')}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Time);
