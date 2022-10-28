const leadReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LEAD':
            return action.payload;
        case 'UNSET_LEAD':
            return [];
        case 'TAKE_DMG':
            let hp = state.hp - action.payload
            return {...state, hp : hp }
        default:
            return state;
    }
};

export default leadReducer;
