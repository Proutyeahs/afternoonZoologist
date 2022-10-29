
// holds the squad for quick access
const squadReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SQUAD':
            return action.payload;
        case 'UNSET_SQUAD':
            return [];
        default:
            return state;
    }
};

export default squadReducer;
