import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* getMonsters() {
    try {
        const monsters = yield axios.get('/api/monster')
        yield put({type : 'SET_MONSTERS', payload : monsters.data})
    } catch (error) {
        console.log(error);
    }
}

function* monsterSaga() {
    yield takeLatest('GET_MONSTERS', getMonsters);
}

export default monsterSaga;
