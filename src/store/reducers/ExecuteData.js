import {
  EXECUTE_DATA_INITIATE,
  EXECUTE_DATA_SUCCESS,
  EXECUTE_DATA_FAILED,
  EXECUTE_DATA_CLEAR
} from "../actionType";
const initialState = {};

const executeDataInitiate = (state, action) => {
  let updatedState = Object.assign({}, state[action.data.key]);
  if (action.data.page) {
    updatedState[action.data.page] = {};
    updatedState[action.data.page] = {
      isInitiated: true
    };
  } else {
    updatedState = {
      isInitiated: true
    };
  }

  return { ...state, [action.data.key]: updatedState };
};

const executeDataSuccess = (state, action) => {
  let updatedState = Object.assign({}, state[action.data.key]);
  if (action.data.data.page) {
    updatedState[action.data.data.page] = {};
    updatedState[action.data.data.page].isInitiated = true;
    updatedState[action.data.data.page].isDone = true;
    updatedState[action.data.data.page].data = action.data.data;
  } else {
    updatedState.isInitiated = true;
    updatedState.isDone = true;
    updatedState.data = action.data.data;
  }

  return { ...state, [action.data.key]: updatedState };
};

const executeDataFailure = (state, action) => {
  let updatedState = Object.assign({}, state[action.data.key]);
  updatedState.isInitiated = true;
  updatedState.isError = true;
  updatedState.error = action.data.error;
  return { ...state, [action.data.key]: updatedState };
};
const clear = (state, action) => {
  return { ...state, [action.key]: {} };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EXECUTE_DATA_INITIATE:
      return executeDataInitiate(state, action);
    case EXECUTE_DATA_SUCCESS:
      return executeDataSuccess(state, action);
    case EXECUTE_DATA_FAILED:
      return executeDataFailure(state, action);
    case EXECUTE_DATA_CLEAR:
      return clear(state, action);
    default:
      return state;
  }
};

export default reducer;
