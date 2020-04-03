import {createStore, applyMiddleware, combineReducers} from 'redux';
import ReduxThunk from 'redux-thunk';
import AsyncStorageReducer from './reducers/SaveAsync';
import ExecuteData from "./reducers/ExecuteData";

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const reducer = combineReducers({AsyncStorageReducer, ExecuteData});
const store = createStoreWithMiddleware(reducer);

export default store;