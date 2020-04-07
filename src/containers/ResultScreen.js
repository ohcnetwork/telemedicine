import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Linking
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import useTheme from "../constants/theme";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
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
  let data = navigation.getParam("data", {});

  const [report, setReport] = useState(null);

  useEffect(() => {
    if (!at(executeDataResponse, "RISK_RESULT_DATA.isInitiated")) {
      dispatch(
        executeData({
          type: "RISK_RESULT_DATA",
          method: "GET"
        })
      );
    }
    if (at(executeDataResponse, "RISK_RESULT_DATA.isDone")) {

      if (!report) {
        let district = at(asyncState, 'metaData.district_object.name');

        setReport(
          at(executeDataResponse, `RISK_RESULT_DATA.data.kerala.${district}`)
        );
      }
    }
  });


  let width = Math.round(Dimensions.get("window").width);
  let height = Math.round(Dimensions.get("window").height);
  
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
      height: height * 0.85,
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
    },
    resultCard: {
      width: width * 0.9,
      height: 180,
      backgroundColor: theme.success,
      borderRadius: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly",
      padding: 20
    },
    resultTitleText: {
      color: theme.white,
      fontSize: 18,
      fontWeight: "600"
    },
    resultCount: {
      color: theme.white,
      fontSize: 22,
      fontWeight: "bold"
    },
    resultReportText: {
      color: theme.white,
      fontSize: 12,
      fontWeight: "400"
    },
    disclaimer: {
      color: theme.white,
      fontSize: 8,
      fontWeight: "300"
    },
    iconContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
      borderRadius: 10,
      backgroundColor: "#c6f5ff"
    },
    reportCard: {
      marginVertical: 10,
      width: width * 0.9,
      height: 100,
      borderRadius: 25,
      backgroundColor: theme.accentDashboard,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 40
    },
    reportCard1: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "flex-start"
    }
  });


  const handleRequestCall = () => {
    if(!at(executeDataResponse, 'REQUEST_CALL_USER.isInitiated')) {
      dispatch(
        executeData({
          type: "REQUEST_CALL_USER",
          method: 'GET',
          token: at(asyncState, 'token'),
          req: {
            id: at(asyncState, 'metaData.id')
          }
        })
      );
    }
  
  };
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {navigation.navigate("Home", {navigateParam : false});
      dispatch(clearData({
        type: 'REQUEST_CALL_USER'
      }))
      }}>
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
        <View
          style={[
            styles.resultCard,
            {
              backgroundColor:
                at(data, "priority") === "Low" ? theme.success : theme.error
            }
          ]}
        >
          <Text style={styles.resultTitleText}>Your Score</Text>
          <Text style={styles.resultCount}>
            {at(data, "score") ? at(data, "score") : 0}
          </Text>
          {at(data, "priority") === "Low" ? (
            <Text style={styles.resultReportText}>
              Your are having low risk score. Stay Home and Take Neccessary
              Precautions. If you develop any illness. Dont Panic Come Here and
              We will connect you to a Doctor
            </Text>
          ) : (
            <ContainedButton
            onPress={() => handleRequestCall()}
              width={width * 0.6}
              color={at(executeDataResponse, 'REQUEST_CALL_USER.data.message')? theme.success: theme.button}
              text={at(executeDataResponse, 'REQUEST_CALL_USER.data.message')? "Call Requested" : "Request For Medical Call"}
              textColor={theme.white}
            />
          )}
          {!at(executeDataResponse, 'REQUEST_CALL_USER.data.message') ? <Text style={styles.disclaimer}>
            *Disclaimer: The risk score doesnt guarrante that you are safe! Stay
            Indoor and Stay Safe. Wash Hands. Practice Social Distancing
          </Text> : <Text style={[styles.disclaimer, {fontSize: 12, fontWeight: 'bold'}]}>{at(executeDataResponse, 'REQUEST_CALL_USER.data.message')}</Text>}
        </View>

        <ScrollView style={{ marginTop: 10 }}>
          <Text style={{
            color: theme.text,
            fontSize: 14,
            fontWeight: '600'
          }}>Status: {at(asyncState, 'metaData.district_object.name')}</Text>
          <View style={styles.reportCard}>
            <View style={styles.iconContainer}>
              <FontAwesome
                name={"stethoscope"}
                size={25}
                color={theme.active}
              />
            </View>
            <View style={styles.reportCard1}>
              <Text
                style={[
                  styles.resultTitleText,
                  { color: theme.text, fontWeight: "400" }
                ]}
              >
                Under Observation
              </Text>
              <Text
                style={[
                  styles.resultCount,
                  { color: theme.text, fontWeight: "bold" }
                ]}
              >
                {at(report, "under_observation")
                  ? at(report, "under_observation")
                  : 0}
              </Text>
            </View>
          </View>
          <View style={styles.reportCard}>
            <View style={styles.iconContainer}>
              <FontAwesome
                name={"stethoscope"}
                size={25}
                color={theme.active}
              />
            </View>
            <View style={styles.reportCard1}>
              <Text
                style={[
                  styles.resultTitleText,
                  { color: theme.text, fontWeight: "400" }
                ]}
              >
                Under Home Isolation
              </Text>
              <Text
                style={[
                  styles.resultCount,
                  { color: theme.text, fontWeight: "bold" }
                ]}
              >
                {at(report, "under_home_isolation")
                  ? at(report, "under_home_isolation")
                  : 0}
              </Text>
            </View>
          </View>
          <View style={styles.reportCard}>
            <View style={styles.iconContainer}>
              <FontAwesome
                name={"stethoscope"}
                size={25}
                color={theme.active}
              />
            </View>
            <View style={styles.reportCard1}>
              <Text
                style={[
                  styles.resultTitleText,
                  { color: theme.text, fontWeight: "400" }
                ]}
              >
                Total Hospitalized
              </Text>
              <Text
                style={[
                  styles.resultCount,
                  { color: theme.text, fontWeight: "bold" }
                ]}
              >
                {at(report, "total_hospitalised")
                  ? at(report, "total_hospitalised")
                  : 0}
              </Text>
            </View>
          </View>
          <View style={styles.reportCard}>
            <View style={styles.iconContainer}>
              <FontAwesome
                name={"stethoscope"}
                size={25}
                color={theme.active}
              />
            </View>
            <View style={styles.reportCard1}>
              <Text
                style={[
                  styles.resultTitleText,
                  { color: theme.text, fontWeight: "400" }
                ]}
              >
                Hospitalised Today
              </Text>
              <Text
                style={[
                  styles.resultCount,
                  { color: theme.text, fontWeight: "bold" }
                ]}
              >
                {at(report, "hospitalised_today")
                  ? at(report, "hospitalised_today")
                  : 0}
              </Text>
            </View>
          </View>
          <View style={styles.reportCard}>
            <View style={styles.iconContainer}>
              <FontAwesome
                name={"stethoscope"}
                size={25}
                color={theme.active}
              />
            </View>
            <View style={styles.reportCard1}>
              <Text
                style={[
                  styles.resultTitleText,
                  { color: theme.text, fontWeight: "400" }
                ]}
              >
                Corona Positive
              </Text>
              <Text
                style={[
                  styles.resultCount,
                  { color: theme.text, fontWeight: "bold" }
                ]}
              >
                {at(report, "corona_positive")
                  ? at(report, "corona_positive")
                  : 0}
              </Text>
            </View>
          </View>
          <View style={styles.reportCard}>
            <View style={styles.iconContainer}>
              <FontAwesome
                name={"stethoscope"}
                size={25}
                color={theme.active}
              />
            </View>
            <View style={styles.reportCard1}>
              <Text
                style={[
                  styles.resultTitleText,
                  { color: theme.text, fontWeight: "400" }
                ]}
              >
                Discharged | Cured
              </Text>
              <Text
                style={[
                  styles.resultCount,
                  { color: theme.text, fontWeight: "bold" }
                ]}
              >
                {at(report, "cured_discharged")
                  ? at(report, "cured_discharged")
                  : 0}
              </Text>
            </View>
          </View>
          <View style={styles.reportCard}>
            <View style={styles.iconContainer}>
              <FontAwesome
                name={"stethoscope"}
                size={25}
                color={theme.active}
              />
            </View>
            <View style={styles.reportCard1}>
              <Text
                style={[
                  styles.resultTitleText,
                  { color: theme.text, fontWeight: "400" }
                ]}
              >
                Deaths
              </Text>
              <Text
                style={[
                  styles.resultCount,
                  { color: theme.text, fontWeight: "bold" }
                ]}
              >
                {at(report, "deaths") ? at(report, "deaths") : 0}
              </Text>
            </View>
          </View>
        </ScrollView>

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
    </SafeAreaView>
  );
};

export default ResultScreen;