import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// sends post request with companion data
function* saveCompanion(action) {
    try {
        yield axios.post('/api/companion', action.payload)
    } catch (error) {
        console.log(error);
    }
}

// Take latest dispatch
function* companionSaga() {
    yield takeLatest('SAVE_COMPANION', saveCompanion);
}

export default companionSaga;
