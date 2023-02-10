const newCharacterReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NEW_CHARACTER':
      return action.payload;
    default:
      return state;
  }
}

export default newCharacterReducer;