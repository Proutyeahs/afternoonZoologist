const opponentReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_OPPONENT':
            return action.payload;
        case 'UNSET_OPPONENT':
            return [];
        case 'DEAL_DMG':
            let hp = state.hp - action.payload
            return {...state, hp : hp }
        default:
            return state;
    }
};

export default opponentReducer;
