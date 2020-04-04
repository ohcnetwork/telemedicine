import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  FlatList
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import useTheme from "../constants/theme";
import { AntDesign } from "@expo/vector-icons";
import Svg, {
  Polygon,
  Circle,
  Defs,
  LinearGradient,
  Stop
} from "react-native-svg";
import { DrawerActions } from "react-navigation-drawer";
import { executeData, clearData } from "../store/actions/ExecuteData";
import { saveToStore } from "../store/actions/SaveAsync";
import at from "v-at";
import i18n from "i18n-js";

const ChooseScreen = ({ props, navigation }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [asyncState, setAsyncState] = useState();
  const [listData, setData] = useState([]);
  let saveAsync = useSelector(state => {
    return state.AsyncStorageReducer;
  });
  let executeDataResponse = useSelector(state => {
    return state.ExecuteData;
  });
  Promise.resolve(saveAsync).then(value => {
    setAsyncState(value);
  });

  useEffect(() => {
    if (listData.length === 0) {
      if (at(executeDataResponse, "GET_ALL_USERS.isDone")) {
        let dataValue = at(executeDataResponse, "GET_ALL_USERS.data").length > 0 ? [...at(executeDataResponse, "GET_ALL_USERS.data")] : [];

        dataValue.push({ end: true });
        setData(dataValue);
        dispatch(
          clearData({
            type: "GET_ALL_USERS"
          })
        );
      }
    }
  });
  useEffect(() => {
    if (at(asyncState, 'token')) {
      if (!at(executeDataResponse, "GET_ALL_USERS.isInitiated")) {
        dispatch(
          executeData({
            token: asyncState.token,
            type: "GET_ALL_USERS",
            method: "GET"
          })
        );
      }
    }
  });

  let width = Math.round(Dimensions.get("window").width);
  let height = Math.round(Dimensions.get("window").height);
  const handleChooseUser = (name, id) => {
    dispatch(
      saveToStore({
        metaData: {
          activeUser: name,
          id: id
        }
      })
    );
    navigation.navigate("Home");
  };
  const styles = StyleSheet.create({
    root: {
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: theme.background,
      width: width,
      height: height,
      flex: 1
    },
    header: {
      position: "relative",
      zIndex: 3,
      width: width * 0.8,
      marginTop: 60,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between"
    },
    headerText: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.white
    },
    gradient: {
      position: "absolute",
      top: 0,
      left: 0,
      height: height,
      width: width,
      zIndex: 1
    },
    content: {
      width: width * 0.8,
      position: "relative",
      zIndex: 10,
      marginTop: 75,
      height: height * 0.8,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start"
    },
    cards: {
      flex: 1,
      width: width * 0.8
    },
    infoText: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.white,
      marginBottom: 40
    },
    nameText: {
      fontSize: 12,
      fontWeight: "bold",
      color: theme.white
    },
    userCard: {
      marginLeft: 5,
      marginVertical: 5,
      marginRight: 5,
      backgroundColor: theme.active,
      width: width * 0.22,
      height: width * 0.22,
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  });

  const handleCreateUser = () => {
    dispatch(
      clearData({
        type: "GET_ALL_USERS"
      })
    );
    setData([]);
    navigation.navigate("create");
  };
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{i18n.t("title")}</Text>
      </View>
      <View style={styles.gradient}>
        <Svg height="100%" width="100%">
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={theme.active} stopOpacity="1" />
              <Stop offset="1" stopColor={theme.button} stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Circle cx={width} cy={0} r={height} fill="url(#grad)" />
        </Svg>
      </View>
      <View style={styles.content}>
        <Text style={styles.infoText}>{i18n.t('choose_create_user')}</Text>
        <FlatList
          horizontal={false}
          numColumns={3}
          contentContainerStyle={styles.cards}
          data={listData}
          renderItem={({ item }) => {
            if (!item.end) {
              return (
                <TouchableOpacity
                  onPress={() => handleChooseUser(item.name, item.id)}
                >
                  <View style={styles.userCard}>
                    <AntDesign name="idcard" color={theme.white} size={30} />
                    <Text style={styles.nameText}>
                      {item.name.split(" ")[0]}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity onPress={() => handleCreateUser()}>
                  <View style={styles.userCard}>
                    <AntDesign
                      name="pluscircle"
                      color={theme.white}
                      size={30}
                    />
                  </View>
                </TouchableOpacity>
              );
            }
          }}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default ChooseScreen;
