import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// moves the user location
function* move(action) {
    console.log(action.payload)
    try {
        yield axios.put('/api/movement', action.payload)
        yield put({ type: 'FETCH_USER' })
    } catch (error) {
        console.log(error);
    }
}

// Take latest dispatch
function* movementSaga() {
    yield takeLatest('MOVE', move);
}

export default movementSaga;
