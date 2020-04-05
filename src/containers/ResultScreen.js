import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Linking
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import useTheme from "../constants/theme";
import { AntDesign } from "@expo/vector-icons";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { DrawerActions } from "react-navigation-drawer";
import { executeData, clearData } from "../store/actions/ExecuteData";
import { saveToStore } from "../store/actions/SaveAsync";
import at from "v-at";
import i18n from "i18n-js";
import { ContainedButton } from "../components/button/Button";

const ResultScreen = ({ props, navigation }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [asyncState, setAsyncState] = useState({});
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
  console.log("hereeeee");
  let data = navigation.getParam("data", {});

  let width = Math.round(Dimensions.get("window").width);
  let height = Math.round(Dimensions.get("window").height);
  const handleChooseUser = name => {
    dispatch(
      saveToStore({
        metaData: {
          activeUser: name
        }
      })
    );
    navigation.navigate("Home");
  };
  const styles = StyleSheet.create({
    root: {
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: theme.white,
      width: width,
      height: height,
      flex: 1
    },
    header: {
      position: "relative",
      zIndex: 3,
      width: width * 0.9,
      marginTop: 30,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between"
    },
    headerText: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.background
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
      width: width * 0.9,
      position: "relative",
      zIndex: 10,
      marginTop: 20,
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
      marginBottom: 40,
      color: theme.text
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
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <AntDesign name="arrowleft" size={22} color={theme.button} />
        </TouchableOpacity>
      </View>
      <View style={styles.gradient}>
        <Svg height="100%" width="100%">
          <Defs>
            <LinearGradient id="grad3" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={theme.button} stopOpacity="1" />
              <Stop offset="1" stopColor={theme.active} stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Circle cx={width} cy={0} r={width * 0.6} fill="url(#grad3)" />
        </Svg>
      </View>
      <View style={styles.content}>

        <View style ={{
          width: width * 0.9,
          height: 180,
          backgroundColor: theme.success,
          borderRadius: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          padding: 20
        }}>
          <Text style = {{
            color: theme.white,
            fontSize: 18,
            fontWeight: '600'

          }}>
              Your Score
          </Text>
          <Text style = {{
            color: theme.white,
            fontSize: 22,
            fontWeight: 'bold'

          }}>
              10
          </Text>
          <Text style = {{
            color: theme.white,
            fontSize: 12,
            fontWeight: '400'

          }}>
              Your are having low risk score. Stay Home and Take Neccessary Precautions. If you develop any illness. Dont Panic Come Here and We will connect you to a Doctor
          </Text>
          <Text style = {{
            color: theme.white,
            fontSize: 8,
            fontWeight: '300'

          }}>
            *Disclaimer: The risk score doesnt guarrante that you are safe! Stay Indoor and Stay Safe. Wash Hands. Practice Social Distancing
          </Text>

        </View>
        {/* <Text style={styles.infoText}>
          Hey {at(asyncState, "metaData.fullname")}
        </Text>
        <Text style={styles.infoText}> Your Score {at(data, "score")}</Text>
        <Text style={styles.infoText}> Risk {at(data, "priority")}</Text>
        {at(data, "priority") === "Medium" ? (
          <ContainedButton
            text="Call Doc"
            onPress={() => Linking.openURL(`tel:${at(data, "doctoNumber")}`)}
            color={theme.success}
          />
        ) : null}
        {at(data, "priority") === "Medium" ? (
          <Text style={styles.infoText}>
            Doc Names {at(data, "doctorName")}
          </Text>
        ) : null} */}
      </View>
    </View>
  );
};

export default ResultScreen;
