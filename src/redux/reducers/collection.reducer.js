const collectionReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_COLLECTION':
            return [...state, ...action.payload];
        case 'SET_COMPANION':
            return  [...state, ...action.payload];
        case 'UNSET_COLLECTION':
            return [];
        default:
            return state;
    }
};

export default collectionReducer;
