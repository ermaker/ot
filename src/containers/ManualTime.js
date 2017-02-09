import React from 'react';
import { connect } from 'react-redux';
import ManualTime from '../components/ManualTime';
import { change } from '../actions';

const mapStateToProps = (state, ownProps) =>
  state.days[ownProps.day_id].items[ownProps.name];

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (e) => dispatch(change({ownProps, value: e.target.value}))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManualTime);
