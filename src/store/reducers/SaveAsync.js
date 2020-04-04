import {
  SAVE_DATA_ASYNC,
  SAVE_DATA_ASYNC_TOKEN,
  SAVE_DATA_ASYNC_LANGUAGE,
  SAVE_DATA_ASYNC_TOKEN_DATA,
  CLEAR_DATA_ASYNC
} from "../actionType";
import { AsyncStorage } from "react-native";

const saveToStore = (state, action) => {
  let updateState = state;
  updateState = { ...updateState, ...{ metaData: {...updateState.metaData,...action.data.metaData} } };
  return updateState;
};

const saveToStoreToken = (state, action) => {
  let updateState = state;
  updateState = { ...updateState, ...{ token: action.data.token } };
  return updateState;
};
const saveToStoreLanguage = (state, action) => {
  let updateState = state;
  updateState = { ...updateState, ...{ language: action.data.language } };
  return updateState;
};

const saveToStoreTokenAndData = (state, action) => {
  let updateState = state;
  updateState = { ...updateState, ...{ metaData: {...updateState.metaData,...action.data.metaData} },  ...{ token: action.data.token } };
  return updateState;
};

const reducer = async (state, action) => {
  state = (await AsyncStorage.getItem("@storage"))
    ? JSON.parse(await AsyncStorage.getItem("@storage"))
    : {};
  switch (action.type) {
    case SAVE_DATA_ASYNC: {
      let updatedState = await saveToStore(state, action);
      AsyncStorage.setItem("@storage", JSON.stringify(updatedState));
      return updatedState;
    }
    case SAVE_DATA_ASYNC_TOKEN: {
      let updatedState = await saveToStoreToken(state, action);
      AsyncStorage.setItem("@storage", JSON.stringify(updatedState));
      return updatedState;
    }
    case SAVE_DATA_ASYNC_LANGUAGE: {
      let updatedState = await saveToStoreLanguage(state, action);
      AsyncStorage.setItem("@storage", JSON.stringify(updatedState));
      return updatedState;
    }
    case SAVE_DATA_ASYNC_TOKEN_DATA: {
      let updatedState = await saveToStoreTokenAndData(state, action);
      AsyncStorage.setItem("@storage", JSON.stringify(updatedState));
      return updatedState;
    }
    case CLEAR_DATA_ASYNC: {
      let updatedState = {metaData: null, token: null};
      AsyncStorage.setItem("@storage", JSON.stringify({metaData: null, token: null}));
      return updatedState;
    }
    default:
      return state;
  }
};

export default reducer;
