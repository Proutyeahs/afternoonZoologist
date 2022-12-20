import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// sends get request and sets monsters to reducer
function* getMonsters(action) {

    // saves the lead monsters lvl
    let lvl = 6;
    if (action.payload != undefined && action.payload > 6) {
        lvl = action.payload
    }

    try {
        const monsters = yield axios.get(`/api/monster/get/${lvl}`)
        yield put({ type: 'SET_MONSTERS', payload: monsters.data })
    } catch (error) {
        console.log(error);
    }
}

// sends post request with caught monsters data
function* catchMonster(action) {
    try {
        yield axios.post('/api/monster', action.payload)
    } catch (error) {
        console.log(error);
    }
}

// sends get request for caught monsters and sets them to a reducer
function* getCollection() {
    try {
        const collection = yield axios.get('/api/monster/collection')
        yield put({ type: 'SET_COLLECTION', payload: collection.data })
    } catch (error) {
        console.log(error);
    }
}

// sends put request to set users squad then gets squad
function* updateSquad(action) {
    console.log(action.payload)
    try {
        yield axios.put('/api/monster/squad', action.payload)
        yield put({ type: 'GET_SQUAD' })
    } catch (error) {
        console.log(error);
    }
}

// sends get request for monsters in your squad then saves them and a leader to reducers
function* getSquad() {
    try {
        const squad = yield axios.get('/api/monster/squad')
        yield put({ type: 'SET_SQUAD', payload: squad.data })
        // yield put({ type: 'SET_LEAD', payload: squad.data[0] })
    } catch (error) {
        console.log(error);
    }
}

// sends put request to set a monsters hp to 0 then runs getSquad
function* dead(action) {
    try {
        yield axios.put('/api/monster/dead', action.payload)
        yield put({ type: 'UNSET_SQUAD' })
        yield put({ type: 'GET_SQUAD_COMPANION' })
        yield put({ type: 'GET_SQUAD' })
    } catch (error) {
        console.log(error);
    }
}

// sends a put request to run exp/lvl gain functions then gets updated squad
function* win(action) {
    console.log(action.payload)
    try {
        yield axios.put('/api/monster/win', action.payload)
        yield put({ type: 'UNSET_SQUAD' })
        yield put({ type: 'GET_SQUAD_COMPANION' })
        yield put({ type: 'GET_SQUAD' })
    } catch (error) {
        console.log(error);
    }
}

// Take latest dispatch
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
