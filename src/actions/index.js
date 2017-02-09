export const change = ({ownProps, value}) => (
  Object.assign({type: 'CHANGE'}, {ownProps, value})
);
