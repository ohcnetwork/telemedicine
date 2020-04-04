import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import at from "v-at";

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Text
} from "react-native";
import useTheme from "../constants/theme";
import { DrawerActions } from "react-navigation-drawer";
import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
import i18n from "i18n-js";
import * as Device from "expo-device";
import Table from "../components/table/Table";
import { ContainedButton } from "../components/button/Button";
import { executeData } from "../store/actions/ExecuteData";
async function getDevice() {
  let device = 0;
  device = await Device.getDeviceTypeAsync();
  return device;
}

const DashboardScreen = ({ props, navigation }) => {
  const theme = useTheme();
  const device = getDevice();
  let width = Math.round(Dimensions.get("window").width);
  let height = Math.round(Dimensions.get("window").height);
  const styles = StyleSheet.create({
    root: {
      backgroundColor: theme.backgroundDashboard,
      width: width,
      height: height,
      flex: 1
    },
    container: {
      // margin: desktop ? 65 : 10
    },
    topNav: {
      height: 60,

      justifyContent: "space-between",
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    },
    headerText: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.text
    },
    desktopContainer: {
      display: "flex",
      height: height,
      width: width,
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between"
    },
    sideNav: {
      backgroundColor: theme.accentDashboard,
      width: width * 0.25,
      height: height,
      paddingVertical: 20,
      paddingHorizontal: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start"
    },
    mainContainer: {
      backgroundColor: theme.dashboard,
      width: width * 0.75,
      height: height,
      padding: 50
    },
    tabBar: {
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "space-evenly"
    },
    searchBar: {
      width: 250,
      height: 35,
      borderRadius: 20,
      display: "flex",
      flexDirection: "row",
      padding: 20,
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.accentDashboard
    },
    searchText: {
      color: theme.paragraph,
      fontSize: 12,
      fontWeight: "500"
    },
    tabText: {
      color: theme.text,
      fontSize: 14,
      fontWeight: "bold",
      textAlign: "center"
    },
    tabBlock: {
      marginHorizontal: 20,
      display: "flex",
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },
    tabBlockActive: {
      borderBottomColor: theme.active,
      borderBottomWidth: 2
    },
    tabTextActive: {
      color: theme.active
    },
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      width: Math.round(width * 0.75 - 100)
    },
    contentNav: {
      height: 65,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    content: {
      backgroundColor: theme.white,
      borderRadius: 10
    },
    subTabBar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      width: Math.round(width * 0.75 - 220)
    },
    filters: {
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "flex-start"
    },
    filterIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.accent,
      width: 40,
      height: 40,
      borderRadius: 10,
      marginHorizontal: 20
    },
    addNew: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.button,
      width: 40,
      height: 40,
      borderRadius: 10
    },
    profileTab: {
      height: 80,
      width: width * 0.2,
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "flex-start",
      borderBottomWidth: 1,
      borderBottomColor: theme.button
    },
    textProfile: {
      marginHorizontal: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "flex-start"
    },
    sideNavContentHome: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20
    },
    patientDataCard: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingHorizontal: 20,
      backgroundColor: theme.dashboard,
      width: Math.round(width * 0.2),
      height: 80,
      borderRadius: 18,
      marginVertical: 10
    },
    iconContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
      borderRadius: 10,
      backgroundColor: "#c6f5ff"
    },
    cardText: {
      fontSize: 14,
      fontWeight: "500",
      color: theme.paragraph
    },
    cardCount: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text
    },
    cardContentContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      marginLeft: 20
    },
    sideNavContentPatient: {
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start"
    },
    contentSideNavPatient: {
      marginVertical: 20,
      display: 'flex',
      width: width * 0.2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    text: {
      fontSize: 13,
      color: theme.text,
      fontWeight: '600',
      marginTop: 10
    },
    textBold: {
      fontSize: 14,
      color: theme.text,
      fontWeight: 'bold'
    }
  });
  const dispatch = useDispatch();





  const [asyncState, setAsyncState] = useState({});
  const [desktop, setDesktop] = useState(false);
  const [tab, setTab] = useState("HOME");
  const [subTab, setSubTab] = useState("PATIENT");
  const[status, setStatus] = useState('not_attended');
  console.log(asyncState)

  useEffect(() => {
    if(status && at(asyncState, 'token') ) {
      if(!at(executeDataResponse, 'FETCH_PATIENTS.isInitiated')) {
        dispatch(executeData({
          type: 'FETCH_PATIENTS',
          token: at(asyncState, 'token'),
          method: 'GET',
          req: {
            status: status
          }
        }))
      }
    }
  })






  Promise.resolve(device).then(deviceName => {
    let devices = Device.DeviceType;
    if (deviceName in devices) {
      if (devices[deviceName] === "DESKTOP") {
        setDesktop(true);
      }
    }
  });



  let saveAsync = useSelector(state => {
    return state.AsyncStorageReducer;
  });
  let executeDataResponse = useSelector(state => {
    return state.ExecuteData;
  });
  Promise.resolve(saveAsync).then(value => {
    setAsyncState(value);
  });


 









  return (
    <View style={styles.root}>
      <View style={styles.container}>
        {desktop ? (
          <View style={styles.desktopContainer}>
            <View style={styles.mainContainer}>
              <View style={styles.topNav}>
                <View>
                  <Text style={styles.headerText}>{i18n.t("title")}</Text>
                </View>
                <View style={styles.tabBar}>
                  <View style={styles.searchBar}>
                    <Text style={styles.searchText}>Search Phone Number</Text>
                    <AntDesign
                      name={"search1"}
                      size={12}
                      color={theme.paragraph}
                    />
                  </View>

                  <View style={[styles.tabBlock]}>
                    <Text
                      style={[
                        styles.tabText,
                        tab === "SETTINGS" ? styles.tabTextActive : null
                      ]}
                    >
                      Settings
                    </Text>
                  </View>
                  <View style={[styles.tabBlock, {marginHorizontal: 0, marginRight: 10}]}>
                    <Text
                      style={[
                        styles.tabText,
                        tab === "HOME" ? styles.tabTextActive : null
                      ]}
                    >
                      Home
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.contentNav}>
                  <View style={styles.subTabBar}>
                    <View
                      style={
                        subTab === "PATIENT"
                          ? [styles.tabBlock,{marginHorizontal: 0, marginRight: 10}, styles.tabBlockActive]
                          : [styles.tabBlock, {marginHorizontal: 0, marginRight: 10}]
                      }
                    >
                      <Text
                        style={[
                          styles.tabText,
                          subTab === "PATIENT" ? styles.tabTextActive : null
                        ]}
                      >
                        Patients
                      </Text>
                    </View>
                    <View
                      style={
                        subTab === "OVERVIEW"
                          ? [styles.tabBlock, styles.tabBlockActive]
                          : [styles.tabBlock]
                      }
                    >
                      <Text
                        style={[
                          styles.tabText,
                          subTab === "OVERVIEW" ? styles.tabTextActive : null
                        ]}
                      >
                        Overview
                      </Text>
                    </View>
                  </View>
                  <View style={styles.filters}>
                    <TouchableOpacity style={styles.addNew}>
                      <AntDesign name="plus" size={20} color={theme.accent} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterIcon}>
                      <AntDesign name="filter" size={20} color={theme.button} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.content}>
                  {/* Table */}
                  <Table width={Math.round(width * 0.75 - 100)} />
                  {/* TableEnd */}
                </View>
              </View>
            </View>
            <View style={styles.sideNav}>
              <View style={styles.profileTab}>
                <EvilIcons name="user" size={50} color={theme.button} />
                <View style={styles.textProfile}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: theme.text 
                    }}
                  >
                    {(at(asyncState, 'metaData.name'))? at(asyncState, 'metaData.name'): 'Unknown'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: theme.paragraph
                    }}
                  >
                     {(at(asyncState, 'metaData.ROLE'))? at(asyncState, 'metaData.ROLE').replace('_', " "): 'Unknown'}
                  </Text>
                </View>
              </View>
              <View style={styles.sideNavContentHome}>
                <View style={styles.patientDataCard}>
                  <View style={styles.iconContainer}>
                    <Feather
                      name={"user-plus"}
                      size={25}
                      color={theme.active}
                    />
                  </View>
                  <View style={styles.cardContentContainer}>
                    <Text style={styles.cardText}>New Patients</Text>
                    <Text style={styles.cardCount}>20</Text>
                  </View>
                </View>
                <View style={styles.patientDataCard}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: "#fee3d2" }
                    ]}
                  >
                    <Feather
                      name={"user-check"}
                      size={25}
                      color={theme.active}
                    />
                  </View>
                  <View style={styles.cardContentContainer}>
                    <Text style={styles.cardText}>Checked Patients</Text>
                    <Text style={styles.cardCount}>200</Text>
                  </View>
                </View>
                <View style={styles.patientDataCard}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: "#d8dcf7" }
                    ]}
                  >
                    <Feather name={"user-x"} size={25} color={theme.active} />
                  </View>
                  <View style={styles.cardContentContainer}>
                    <Text style={styles.cardText}>Monitored Patients</Text>
                    <Text style={styles.cardCount}>50</Text>
                  </View>
                </View>
              </View>
              {/* <View style={styles.sideNavContentPatient}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', width: width * 0.2,}}>
                  <View
                    style={
                      tab === "HOME"
                        ? [styles.tabBlock, {marginHorizontal: 0, marginRight: 10}, styles.tabBlockActive]
                        : [styles.tabBlock]
                    }
                  >
                    <Text
                      style={[
                        styles.tabText,
                        tab === "HOME" ? styles.tabTextActive : null
                      ]}
                    >
                      Patient Details
                    </Text>
                  </View>
                  <View style={[styles.tabBlock]}>
                    <Text
                      style={[
                        styles.tabText,
                        tab === "SETTINGS" ? styles.tabTextActive : null
                      ]}
                    >
                      Consultation
                    </Text>
                  </View>
                </View>
                <View style={styles.contentSideNavPatient}>
                  <View>
                  <Text style={styles.textBold}>Abraham George</Text>
                  <Text style={styles.text}>7012912232</Text>
                  </View>
                  <ContainedButton
                    width={80}
                    textColor={theme.white}
                    color={theme.success}
                    text={"Call"}
                    prefix={true}
                    icon="phone"
                  />
                </View>
                <Text style={styles.text}>Medications:</Text>
                <Text style={styles.textBold}>Diabetic</Text>
                <Text style={styles.text}>Symptoms:</Text>
                <Text style={styles.textBold}>Fever</Text>
                <Text style={styles.textBold}>Cold</Text>
              </View> */}
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}
          >
            <AntDesign name="menu-unfold" size={22} color={theme.text} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default DashboardScreen;
