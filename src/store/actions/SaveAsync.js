
import {
  SAVE_DATA_ASYNC,
  SAVE_DATA_ASYNC_TOKEN,
  SAVE_DATA_ASYNC_LANGUAGE,
  SAVE_DATA_ASYNC_TOKEN_DATA,
  CLEAR_DATA_ASYNC
} from '../actionType';



export const saveToStore = (payload) => {
    return dispatch => {
        dispatch(dispatchSaveToStore({
            metaData: payload.metaData,
        }))
    }
}
export const clearStore = (payload) => {
    return dispatch => {
        dispatch(dispatchClearStore())
    }
}
export const saveToStoreToken = (payload) => {
    return dispatch => {
        dispatch(dispatchSaveToStoreToken({
            token: payload.token,
        }))
    }
}
export const saveToStoreTokenAndData = (payload) => {
    return dispatch => {
        dispatch(dispatchSaveToStoreTokenData({
            token: payload.token,
            metaData: payload.metaData,
        }))
    }
}
export const saveToStoreLanguage = (payload) => {
    return dispatch => {
        dispatch(dispatchSaveToStoreLanguage({
            language: payload.language,
        }))
    }
}

const dispatchSaveToStore = (data) => {
    return {
        type: SAVE_DATA_ASYNC,
        data
    };
};
const dispatchSaveToStoreToken = (data) => {
    return {
        type: SAVE_DATA_ASYNC_TOKEN,
        data
    };
};
const dispatchSaveToStoreTokenData = (data) => {
    return {
        type: SAVE_DATA_ASYNC_TOKEN_DATA,
        data
    };
};
const dispatchSaveToStoreLanguage = (data) => {
    return {
        type: SAVE_DATA_ASYNC_LANGUAGE,
        data
    };
};

const dispatchClearStore= () => {
    return {
        type: CLEAR_DATA_ASYNC
    }
}

