const hitPointsReducer = (state = 100, action) => {
  if (action.type === 'SUBTRACT_HIT_POINTS') {
    let newAmount = state - 49;
    if (newAmount <= 0) {
      newAmount = 0;
    }
    return newAmount;
  } else if (action.type === 'RESET_HIT_POINTS') {
    return state = 100;
  } else {
    return state;
  }
}

export default hitPointsReducer;