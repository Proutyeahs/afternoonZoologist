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
  
  // user will be on the redux state at:
  // state.user
  export default monsterReducer;
  