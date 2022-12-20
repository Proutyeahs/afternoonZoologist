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

// sends get request for comapnion and adds them to the reducer
function* getCompanion() {
    try {
        const companion = yield axios.get('/api/companion/collection')
        yield put({ type: 'SET_COMPANION', payload: companion.data })
    } catch (error) {
        console.log(error);
    }
}

// sends get request for companion in your squad
function* getSquadCompanion() {
    try {
        const companion = yield axios.get('/api/companion/squad')
        yield put({ type: 'SET_SQUAD_COMPANION', payload: companion.data })
        // yield put({ type: 'SET_LEAD', payload: squad.data[0] })
    } catch (error) {
        console.log(error);
    }
}

// Take latest dispatch
function* companionSaga() {
    yield takeLatest('SAVE_COMPANION', saveCompanion);
    yield takeLatest('GET_COLLECTION', getCompanion)
    yield takeLatest('GET_SQUAD_COMPANION', getSquadCompanion)
}

export default companionSaga;
