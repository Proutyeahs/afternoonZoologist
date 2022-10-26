import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getMonsters() {
    try {
        const monsters = yield axios.get('/api/monster')
        yield put({type : 'SET_MONSTERS', payload : monsters.data})
    } catch (error) {
        console.log(error);
    }
}

function* catchMonster(action) {
    try {
        yield axios.post('/api/monster', action.payload)

    } catch (error) {
        console.log(error);
    }
}

function* monsterSaga() {
    yield takeLatest('GET_MONSTERS', getMonsters);
    yield takeLatest('CATCH_MONSTER', catchMonster)
}

export default monsterSaga;
