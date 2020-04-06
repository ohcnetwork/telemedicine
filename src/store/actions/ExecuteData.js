import {
  EXECUTE_DATA_INITIATE,
  EXECUTE_DATA_SUCCESS,
  EXECUTE_DATA_FAILED,
  EXECUTE_DATA_CLEAR
} from "../actionType";

export const clearData = payload => {
  return {
    type: EXECUTE_DATA_CLEAR,
    key: payload.type
  };
};

let executeDataConfig = {
  SEND_PHONE_NUMBER: {
    url: `https://tele.coronasafe.in/api/authorize/otp/send`
  },
  SEND_OTP_CHECK: { url: "https://tele.coronasafe.in/api/authorize/otp/verify" },
  UPDATE_USER_DATA: {url: "https://tele.coronasafe.in/api/user/update"},
  FETCH_QUESTIONS: {url : "https://tele.coronasafe.in/api/questions/fetch"},
  SEND_ANSWERS:{ url : "https://tele.coronasafe.in/api/answers/submit"} ,
  GET_ALL_USERS: {url : "https://tele.coronasafe.in/api/user/all/get"},
  DISTRICT_LIST: {url : "https://api.care.coronasafe.in/api/v1/state/1/districts/"},
  LOCAL_BODY_LIST: {url: "https://api.care.coronasafe.in/api/v1/local_body/"},
  RISK_RESULT_DATA: {url: "https://volunteer.coronasafe.network/api/reports"},
  REQUEST_CALL_USER: { url: "https://tele.coronasafe.in/api/user/schedule"},
  EMAIL_LOGIN: {url : "https://tele.coronasafe.in/api/authorize/login"},
  FETCH_PATIENTS: {url: "https://tele.coronasafe.in/api/doctors/requests/fetch"},
  GET_COUNT: {url : "https://tele.coronasafe.in/api/doctors/requests/count"},
  UPDATE_STATE: {url: "https://tele.coronasafe.in/api/doctors/requests/update"},
  SCHEDULE_NEW_ENTRY: {url: "https://tele.coronasafe.in/api/user/schedule"},
  CONSULTATION_DOCTOR: {url: "https://tele.coronasafe.in/api/doctors/requests/consultation"}
};

export const executeData =  payload => {
  let url = executeDataConfig[payload.type].url;
  payload.key = `${payload.type}`;
  let headers = {
    "Content-Type": "application/json",
  };
  if(!payload.cookies) {
    headers['Access-Control-Allow-Origin'] = '*'
  }

  if(payload.token) {
    headers['x-access-token'] = payload.token
  }

  if (payload.headers) {
    headers = { ...payload.headers, ...headers };
  }

  return dispatch => {
    dispatch(
      executeDataInitiate({
        key: payload.key,
        page: (payload.req && payload.req.page) ? payload.req.page : false
      })
    );
    if (payload.method === "POST") {
      fetch(url, {
        method: payload.method,
        headers: headers,
        body: payload.req
      })
      .then( response => {
        Promise.resolve(response.json()).then((value) => {
          if(value.data) {
            dispatch(
              executeDataSuccess({
                key: payload.key,
                data: value.data
              })
            );
          } else {
            dispatch(
              executeDataSuccess({
                key: payload.key,
                data: value
              })
            );
          }
            })
        })
        .catch(error => {
          dispatch(
            executeDataFailure({
              key: payload.key,
              error
            })
          );
        });
    } else if (payload.method === "GET") {
      let qp = "";

      if(payload.req) {
        Object.keys(payload.req).map(key => {
          if (qp.length > 0) {
            qp += "&";
          } 
            qp += `${key}=${payload.req[key]}`;
          
        });
        url = `${url}?${qp}`;
      }
     
      fetch(url, {
        method: payload.method,
        headers: headers
      })
        .then( response => {
            Promise.resolve(response.json()).then((value) => {
              if(value.data) {
                dispatch(
                  executeDataSuccess({
                    key: payload.key,
                    data: value.data
                  })
                );
              } else {
                dispatch(
                  executeDataSuccess({
                    key: payload.key,
                    data: value
                  })
                );
              }
               
                })
            })
          
        .catch(error => {
          dispatch(
            executeDataFailure({
              key: payload.key,
              error
            })
          );
        });
    }
  };
};

const executeDataInitiate = data => {
  return {
    type: EXECUTE_DATA_INITIATE,
    data
  };
};

const executeDataSuccess = data => {
  return {
    type: EXECUTE_DATA_SUCCESS,
    data: data
  };
};

const executeDataFailure = err => {
  return {
    type: EXECUTE_DATA_FAILED,
    data: err
  };
};
