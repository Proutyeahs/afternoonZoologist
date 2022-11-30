import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getMap(action) {
    try {
        const map = yield axios.get(`/api/map/${action.payload}`)
        yield put({ type: 'SET_MAP', payload: map.data })
    } catch (error) {
        console.log(error);
    }
}


// Take latest dispatch
function* monsterSaga() {
    yield takeLatest('GET_MAP', getMap);
}

export default monsterSaga;
