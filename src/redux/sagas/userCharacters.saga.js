import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


// GET
function* fetchUserCharacters() {
  try {
    // response.data is the array from the characters reducer
    const response = yield axios.get('/userCharacters')
    console.log('response.data fetchCharacters:', response.data)
    yield put({ type: 'SET_USER_CHARACTERS', payload: response.data })
  } catch (error) {
    console.error('Error fetchCharacters characters.saga.js', error);
  }
}

// POST
function* addCharacter(action) {
  try {
    const response = yield axios.post('/userCharacters', action.payload)
    console.log('response:', response);
    yield put({ type: 'FETCH_USER_CHARACTERS' })
  } catch (error) {
    console.error('Error addCharacter userCharacters.saga.js', error)
  }
}

// POST
function* addName(action) {
  try {
    const response = yield axios.post('/userCharacters', action.payload)
    console.log('response:', response);
    yield put({ type: 'FETCH_USER_CHARACTERS' })
  } catch (error) {
    console.error('Error addCharacter userCharacters.saga.js', error)
  }
}

function* userCharactersSaga() {
  yield takeLatest('FETCH_USER_CHARACTERS', fetchUserCharacters);
  yield takeLatest('ADD_CHARACTER', addCharacter);
}

export default userCharactersSaga;