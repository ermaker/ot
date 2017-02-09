import React from 'react';
import { connect } from 'react-redux';
import Week from '../components/Week';

const mapStateToProps = week => week;

export default connect(mapStateToProps)(Week);
