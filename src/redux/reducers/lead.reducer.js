
// holds the squad leader for quick access
const leadReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LEAD':
            return action.payload;
        case 'UNSET_LEAD':
            return [];
        case 'TAKE_DMG':

            // updates hp
            let hp = state.hp - action.payload
            if(hp < 0) {
                hp = 0
            }
            return { ...state, hp: hp }

        default:
            return state;
    }
};

export default leadReducer;
