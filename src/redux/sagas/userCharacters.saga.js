import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


// POST
function* createCharacter(action) {
  const characterToAdd = action.payload;
  console.log('createCharacter characterToAdd:', characterToAdd);
  // Send new character (action.payload) to server
  // (POST /userCharacters)
  try {
    const response = yield axios.post('/userCharacters', characterToAdd)
    // response.data is "Created" from the server
    console.log('createCharacter saga response.data:', response.data);

    yield put({ type: 'SAGA/FETCH_USER_CHARACTERS' })
  } catch (error) {
    console.error('Error createCharacter saga:', error)
  }
}

// GET userCharacters
function* fetchUserCharacters() {
  try {
    const response = yield axios.get('/userCharacters')
    // console.log('response.data fetchUserCharacters:', response.data)
    yield put({ type: 'SET_USER_CHARACTERS', payload: response.data })
  } catch (error) {
    console.error('Error fetchUserCharacters saga', error);
  }
}

// DELETE
function* deleteCharacter(action) {
  try {
    const response = yield axios.delete(`/userCharacters/${action.payload.characterId}`)

    const idToSend = {
      userId: action.payload.user_id,
      characterId: action.payload.characterId
    }

    yield put({ type: 'DELETE_CHARACTER', payload: idToSend })
    // yield put to bring the DOM back in sync
    yield put({ type: 'SAGA/FETCH_USER_CHARACTERS' })
  } catch (error) {
    console.error('Error deleteCharacter saga:', error)
  }
}

// PUT
function* updateCharacter(action) {
  try {
    const response = yield axios.put(`/userCharacters/${action.payload.characterId}`)

    const idToSend = {
      userId: action.payload.user_id,
      characterId: action.payload.characterId
    }

    yield put({ type: 'UPDATE_CHARACTER', payload: idToSend })
    // yield put to bring the DOM back in sync
    yield put({ type: 'SAGA/FETCH_USER_CHARACTERS' })
  } catch (error) {
    console.error('Error updateCharacter saga:', error)
  }
}

function* userCharactersSaga() {
  yield takeLatest('SAGA/FETCH_USER_CHARACTERS', fetchUserCharacters);
  yield takeLatest('SAGA/CREATE_CHARACTER', createCharacter);
  yield takeLatest('SAGA/DELETE_CHARACTER', deleteCharacter);
  yield takeLatest('SAGA/UPDATE_SELECTED_CHARACTER', updateCharacter);
}


export default userCharactersSaga;