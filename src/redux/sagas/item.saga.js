import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// sends get request for comapnion and adds them to the reducer
function* getItems() {
    try {
        const items = yield axios.get('/api/item')
        yield put({ type: 'SET_ITEMS', payload: items.data })
    } catch (error) {
        console.log(error);
    }
}

// sends item id to reduce quantity
function* useItem(action) {
    try{
        yield axios.put('/api/item', action.payload)
        yield put({ type: 'GET_ITEMS'})
    } catch (error) {
        console.log(error);
    }
}

// sends item to be added to inventory
function* addItem(action) {
    try{
        yield axios.post('/api/item', action.payload)
        yield put({ type: 'GET_ITEMS'})
    } catch (error) {
        console.log(error);
    }
}

// Take latest dispatch
function* itemSaga() {
    yield takeLatest('GET_ITEMS', getItems);
    yield takeLatest('USE_ITEM', useItem);
    yield takeLatest('ADD_ITEM', addItem)
}

export default itemSaga;
