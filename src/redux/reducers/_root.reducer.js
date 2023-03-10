import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import characters from './characters.reducer';
import newCharacter from './newCharacter.reducer';
import userCharacters from './userCharacters.reducer';
import selectedCharacter from './selectedCharacter.reducer';
import items from './items.reducer';
import backpack from './backpack.reducer';
import energyPoints from './energyPoints.reducer';
import hitPoints from './hitPoints.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  characters,
  newCharacter,
  userCharacters,
  selectedCharacter,
  items,
  backpack,
  energyPoints,
  hitPoints
});

export default rootReducer;
