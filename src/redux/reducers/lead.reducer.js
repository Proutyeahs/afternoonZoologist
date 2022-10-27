const leadReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LEAD':
            return action.payload;
        case 'UNSET_LEAD':
            return [];
        default:
            return state;
    }
};

export default leadReducer;
