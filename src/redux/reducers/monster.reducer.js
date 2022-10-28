const monsterReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MONSTERS':
            return action.payload;
        case 'UNSET_MONSTERS':
            return [];
        case 'POP_MONSTER':
            for (let monster of state) {
                if (monster.id === action.payload.id) {
                    let index = state.indexOf(monster)
                    state.splice(index, 1)
                }
            };
        default:
            return state;
    }
};

export default monsterReducer;
