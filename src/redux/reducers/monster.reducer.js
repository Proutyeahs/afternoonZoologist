const monsterReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MONSTERS':
            return action.payload;
        case 'UNSET_MONSTERS':
            return [];
        default:
            return state;
    }
};

export default monsterReducer;
