import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import monsters from './monster.reducer';
import collection from './collection.reducer';
import squad from './squad.reducer';
import lead from './lead.reducer';
import opponent from './opponent.reducer';
import map from './map.reducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  monsters,
  collection,
  squad,
  lead,
  opponent,
  map,
});

export default rootReducer;
