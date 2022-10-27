const opponentReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_OPPONENT':
            return action.payload;
        case 'UNSET_OPPONENT':
            return [];
        default:
            return state;
    }
};

export default opponentReducer;
