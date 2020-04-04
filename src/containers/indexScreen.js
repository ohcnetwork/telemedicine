import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View } from "react-native";
import at from 'v-at';
import useTheme from '../constants/theme';
import { saveToStore } from '../store/actions/SaveAsync';

const IndexScreen = ({ props, navigation }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [asyncState, setAsyncState] = useState({});
  let saveAsync = useSelector(state => {
    return state.AsyncStorageReducer;
  });
  Promise.resolve(saveAsync).then(value => {
    setAsyncState(value);
  }).then(() =>{
    handleNavigation();

  });

  const handleNavigation =  () => {
    let token = asyncState.token;
    let primary = at(asyncState , 'metaData.primary');
    let multiple = at(asyncState , 'metaData.multiple');
    let role = at(asyncState , 'metaData.ROLE');

    if (token) {
        if(token && primary) {
            if(token && primary && multiple ) {
                navigation.navigate("chooseIndexUserScreen");
            } else {
                dispatch(saveToStore({
                    metaData: {
                        activeUser: at(asyncState , 'metaData.fullname')
                    }
                }))
                navigation.navigate("home");
            }
        } else if(token && role) {
            navigation.navigate("dashboard", {ROLE: role});
        }   
    } else 
    {
        navigation.navigate("auth");
  };
  
}

  return <View style={{backgroundColor: theme.background, flex: 1}} ></View>;
};


export default IndexScreen;

