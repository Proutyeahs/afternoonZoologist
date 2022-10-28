import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getMonsters(action) {
    let lvl = 6;
    if(action.payload != undefined || action.payload > 6) {
        lvl = action.payload
    }
    console.log(lvl)
    try {
        const monsters = yield axios.get(`/api/monster/get/${lvl}`)
        yield put({ type: 'SET_MONSTERS', payload: monsters.data })
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

function* getCollection() {
    try {
        const collection = yield axios.get('/api/monster/collection')
        yield put({ type: 'SET_COLLECTION', payload: collection.data })
    } catch (error) {
        console.log(error);
    }
}

function* updateSquad(action) {
    console.log(action.payload)
    try {
        yield axios.put('/api/monster/squad', action.payload)
        yield put({ type: 'GET_SQUAD' })
    } catch (error) {
        console.log(error);
    }
}

function* getSquad() {
    try {
        const squad = yield axios.get('/api/monster/squad')
        yield put({ type: 'SET_SQUAD', payload: squad.data })
        yield put({ type: 'SET_LEAD', payload: squad.data[0] })
    } catch (error) {
        console.log(error);
    }
}

function* dead(action) {
    try {
        yield axios.put('/api/monster/dead', action.payload)
    } catch (error) {
        console.log(error);
    }
}

function* win(action) {
    console.log(action.payload)
    try {
        yield axios.put('/api/monster/win', action.payload)
        yield put({ type: 'GET_SQUAD' })
    } catch (error) {
        console.log(error);
    }
}

function* monsterSaga() {
    yield takeLatest('GET_MONSTERS', getMonsters);
    yield takeLatest('CATCH_MONSTER', catchMonster)
    yield takeLatest('GET_COLLECTION', getCollection)
    yield takeLatest('UPDATE_SQUAD', updateSquad)
    yield takeLatest('GET_SQUAD', getSquad)
    yield takeLatest('DEAD', dead)
    yield takeLatest('WIN', win)
}

export default monsterSaga;
