import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import at from "v-at";
import RNPickerSelect from "react-native-picker-select";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";
import useTheme from "../constants/theme";
import { DrawerActions } from "react-navigation-drawer";
import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
import i18n from "i18n-js";
import * as Device from "expo-device";
import Table from "../components/table/Table";
import { ContainedButton } from "../components/button/Button";
import { executeData, clearData } from "../store/actions/ExecuteData";
import { clearStore } from "../store/actions/SaveAsync";
import Menu from '../components/menu/Menu';
import AddNewPatient from './AddNewPatient';
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

  
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      width: width * 0.15,
      height: 30,
      marginBottom: 20,
      marginTop: 5,
      backgroundColor: theme.background,
      color: theme.text,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderBottomWidth: 0,
      padding: 8,
    },
    inputAndroid: {
      width: width * 0.15,
      marginBottom: 20,
      marginTop: 5,
      height: 30,
      backgroundColor: theme.background,
      color: theme.text,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderBottomWidth: 0,
      padding: 8,
    },
  });
  const styles = StyleSheet.create({
    root: {
      backgroundColor: theme.backgroundDashboard,
      width: width,
      height: height,
      flex: 1,
    },
    container: {
      // margin: desktop ? 65 : 10
    },
    topNav: {
      height: 60,

      justifyContent: "space-between",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: Math.round(width * 0.75 - 100)
    },
    headerText: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.text,
    },
    desktopContainer: {
      display: "flex",
      height: height,
      width: width,
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
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
      justifyContent: "flex-start",
    },
    mainContainer: {
      backgroundColor: theme.dashboard,
      width: width * 0.75,
      height: height,
      padding: 50,
    },
    tabBar: {
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "space-evenly",
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
      backgroundColor: theme.accentDashboard,
    },
    searchText: {
      color: theme.paragraph,
      fontSize: 12,
      fontWeight: "500",
    },
    tabText: {
      color: theme.text,
      fontSize: 14,
      fontWeight: "bold",
      textAlign: "center",
    },
    tabBlock: {
      marginHorizontal: 20,
      display: "flex",
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    tabBlockActive: {
      borderBottomColor: theme.active,
      borderBottomWidth: 2,
    },
    tabTextActive: {
      color: theme.active,
    },
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      width: Math.round(width * 0.75 - 100),
    },
    contentNav: {
      height: 65,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    content: {
      backgroundColor: theme.white,
      borderRadius: 10,
    },
    subTabBar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      width: Math.round(width * 0.75 - 220),
    },
    filters: {
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    filterIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.accent,
      width: 40,
      height: 40,
      borderRadius: 10,
      marginHorizontal: 20,
    },
    addNew: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.button,
      width: 40,
      height: 40,
      borderRadius: 10,
    },
    profileTab: {
      height: 80,
      width: width * 0.2,
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "flex-start",
      borderBottomWidth: 1,
      borderBottomColor: theme.button,
    },
    textProfile: {
      marginHorizontal: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "flex-start",
    },
    sideNavContentHome: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
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
      marginVertical: 10,
    },
    iconContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
      borderRadius: 10,
      backgroundColor: "#c6f5ff",
    },
    cardText: {
      fontSize: 13,
      fontWeight: "500",
      color: theme.paragraph,
    },
    cardCount: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text,
    },
    cardContentContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      marginLeft: 20,
    },
    sideNavContentPatient: {
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    contentSideNavPatient: {
      marginVertical: 10,
      display: "flex",
      width: width * 0.2,
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    text: {
      fontSize: 13,
      color: theme.text,
      fontWeight: "600",
      marginTop: 10,
    },
    textBold: {
      fontSize: 14,
      color: theme.text,
      fontWeight: "bold",
    },
    menuContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 50,
      backgroundColor: "#ecf0f1",
    },
  });
  const dispatch = useDispatch();
  Promise.resolve(device).then((deviceName) => {
    let devices = Device.DeviceType;
    if (deviceName in devices) {
      if (devices[deviceName] === "DESKTOP") {
        setDesktop(true);
      }
    }
  });

  let saveAsync = useSelector((state) => {
    return state.AsyncStorageReducer;
  });
  let executeDataResponse = useSelector((state) => {
    return state.ExecuteData;
  });
  Promise.resolve(saveAsync).then((value) => {
    setAsyncState(value);
  });

  const [asyncState, setAsyncState] = useState({});
  const [desktop, setDesktop] = useState(false);
  const [tab, setTab] = useState("HOME");
  const [subTab, setSubTab] = useState("PATIENT");
  const [status, setStatus] = useState("All");
  const [patients, setPatients] = useState([]);

  const [page, setPage] = useState(1);
  const [countData, setCountData] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  const [actionValueVolunteer, setActionValueVolunteer] = useState(null);
  const [active, setActive] = useState(null);
  const [filterMenu, setFilterMenu] = useState(false);
  const[logoutMenu , setLogoutMenu] = useState(false);
const[sideNavRootView, setDidNavRootView] = useState('COUNT');
  useEffect(() => {
    if (status && at(asyncState, "token")) {
      if (!at(executeDataResponse, `FETCH_PATIENTS.${page}.isInitiated`)) {
        dispatch(
          executeData({
            type: "FETCH_PATIENTS",
            token: at(asyncState, "token"),
            method: "GET",
            req: {
              status: status,
              page: page,
            },
          })
        );
      }
      if (!at(executeDataResponse, "GET_COUNT.isInitiated")) {
        dispatch(
          executeData({
            method: "GET",
            type: "GET_COUNT",
            token: at(asyncState, "token"),
          })
        );
      }
      if (at(executeDataResponse, "GET_COUNT.isDone")) {
        if (!countData) {
          setCountData(at(executeDataResponse, "GET_COUNT.data"));
        }
      }
      if (at(executeDataResponse, `FETCH_PATIENTS.${page}.isDone`)) {
        if (patients.length === 0) {
          setPatients(
            at(executeDataResponse, `FETCH_PATIENTS.${page}.data.entries`)
          );
        }
      }
    }
  });

  const handleRowView = (id, row) => {
    setDidNavRootView('PATIENT');
    setActiveRow(row);
    setActive(id);
  };

  const actionDataVolunteer = [
    { label: "NOT ATTENDED", value: "not_attended" },
    { label: "ATTEND", value: "attending_by_volunteer" },
    { label: "FORWARD TO DOCTOR", value: "forwarded_to_doctor" },
    { label: "CLOSE CASE", value: "closed_by_volunteer" },
  ];

  const actionDataVolunteerMenu = [
    {label: "ALL", value: "All"},
    { label: "NOT ATTENDED", value: "not_attended" },
    { label: "ATTENDED", value: "attending_by_volunteer" },
    { label: "FORWARDED TO DOCTOR", value: "forwarded_to_doctor" },
    { label: "CLOSED CASES", value: "closed_by_volunteer" },
  ];
  const profileMenu = [
    { label: "LOGOUT", value: "logout" },
  ];

  const placeholderAction = {
    label: "Select an Action",
    value: null,
    color: theme.paragraph,
  };

  const handlePatientCreate = (data) => {
    setDidNavRootView('COUNT');
    dispatch(executeData({
      type:'SCHEDULE_NEW_ENTRY',
      method: 'GET',
      token: at(asyncState, 'token'),
      req: data
    }));
    dispatch(
      clearData({
        type: "FETCH_PATIENTS",
      })
    );
    setPatients([]);
  }

  const handleStateAction = () => {
    let requestId = at(activeRow, "request_id");
    dispatch(
      executeData({
        method: "GET",
        type: "UPDATE_STATE",
        token: at(asyncState, "token"),
        req: {
          status: actionValueVolunteer,
          request_id: requestId,
        },
      })
    );
    dispatch(
      clearData({
        type: "FETCH_PATIENTS",
      })
    );
    setPatients([]);
  };
  const handleMenuProfile = (item) => {
    console.log('here')
    setLogoutMenu(false);
    dispatch(clearStore());
    window.location.reload();
  }

  const handleMenuPress = (item) => {
    if(item) {
      setFilterMenu(false);
      dispatch(clearData({
        type: 'FETCH_PATIENTS'
      }));
      setPatients([]);
      setStatus(item.value)
    }
  }

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
                  {/* <View style={styles.searchBar}>
                    <Text style={styles.searchText}>Search Phone Number</Text>
                    <AntDesign
                      name={"search1"}
                      size={12}
                      color={theme.paragraph}
                    />
                  </View> */}

                  <View style={[styles.tabBlock, {marginHorizontal: 0, marginRight: 10}]}>
                    <Text
                      style={[
                        styles.tabText,
                        tab === "SETTINGS" ? styles.tabTextActive : null,
                      ]}
                    >
                      Settings
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.tabBlock,
                      { marginHorizontal: 0, marginRight: 10 },
                    ]}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        tab === "HOME" ? styles.tabTextActive : null,
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
                          ? [
                              styles.tabBlock,
                              { marginHorizontal: 0, marginRight: 10 },
                              styles.tabBlockActive,
                            ]
                          : [
                              styles.tabBlock,
                              { marginHorizontal: 0, marginRight: 10 },
                            ]
                      }
                    >
                      <Text
                        style={[
                          styles.tabText,
                          subTab === "PATIENT" ? styles.tabTextActive : null,
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
                          subTab === "OVERVIEW" ? styles.tabTextActive : null,
                        ]}
                      >
                        Overview
                      </Text>
                    </View>
                  </View>
                  <View style={styles.filters}>
                 
                    <TouchableOpacity onPress={() => setDidNavRootView('ADD_PATIENT')} style={styles.addNew}>
                      <AntDesign name="plus" size={20} color={theme.accent} />
                    </TouchableOpacity>
                     <TouchableOpacity onPress={() => setFilterMenu(!filterMenu)} style={styles.filterIcon}>
                     <AntDesign
                        name="filter"
                        size={20}
                        color={theme.button}
                      />
                      </TouchableOpacity>
                      
                      
                  </View>
                </View>
                <View style={styles.content}>
                  {/* Table */}
                  <Table
                    width={Math.round(width * 0.75 - 100)}
                    active={active}
                    handleRowView={(id, row) => handleRowView(id, row)}
                    rows={patients}
                  />
                  {/* TableEnd */}
                  {filterMenu ? <Menu
                  onPress={(item) => handleMenuPress(item)}
                  data={actionDataVolunteerMenu}/>: null}
                </View>
              </View>
            </View>
            <View style={styles.sideNav}>
            {logoutMenu ? <Menu data={profileMenu} backgroundColor={theme.white} onPress={(item) => handleMenuProfile(item)} height={40} right={60}/> : null}
              <View style={styles.profileTab}>

                <TouchableOpacity onPress={() => setLogoutMenu(!logoutMenu)}>
                <EvilIcons name="user" size={50} color={theme.button} />
                </TouchableOpacity>
                <View style={styles.textProfile}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: theme.text,
                    }}
                  >
                    {at(asyncState, "metaData.name")
                      ? at(asyncState, "metaData.name")
                      : "Unknown"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: theme.paragraph,
                    }}
                  >
                    {at(asyncState, "metaData.ROLE")
                      ? at(asyncState, "metaData.ROLE").replace("_", " ")
                      : "Unknown"}
                  </Text>
                </View>
              </View>
              <ScrollView>

                {(sideNavRootView === 'COUNT' )? (
                  <View style={styles.sideNavContentHome}>
                    {countData
                      ? Object.keys(countData).map((key) => {
                          return (
                            <View style={styles.patientDataCard}>
                              <View
                                style={[
                                  styles.iconContainer,
                                  {
                                    backgroundColor:
                                      "hsl(" +
                                      Math.random() * 360 +
                                      ", 80%, 90%)",
                                  },
                                ]}
                              >
                                <AntDesign
                                  name={"infocirlceo"}
                                  size={25}
                                  color={theme.active}
                                />
                              </View>
                              <View style={styles.cardContentContainer}>
                                <Text
                                  style={[
                                    styles.cardText,
                                    { textTransform: "uppercase" },
                                  ]}
                                >
                                  {key.replace(/_/g, " ")}
                                </Text>
                                <Text style={styles.cardCount}>
                                  {countData[key]}
                                </Text>
                              </View>
                            </View>
                          );
                        })
                      : null}
                  </View>
                ) : 
                (sideNavRootView === 'PATIENT')?
                (
                  <View style={styles.sideNavContentPatient}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        width: width * 0.2,
                      }}
                    >
                      <View
                        style={
                          tab === "HOME"
                            ? [
                                styles.tabBlock,
                                { marginHorizontal: 0, marginRight: 10 },
                                styles.tabBlockActive,
                              ]
                            : [styles.tabBlock]
                        }
                      >
                        <Text
                          style={[
                            styles.tabText,
                            tab === "HOME" ? styles.tabTextActive : null,
                          ]}
                        >
                          Patient Details
                        </Text>
                      </View>
                      <View style={[styles.tabBlock]}>
                        <Text
                          style={[
                            styles.tabText,
                            tab === "SETTINGS" ? styles.tabTextActive : null,
                          ]}
                        >
                          {at(asyncState, "metaData.ROLE") === "IMA_VOLUNTEER"
                            ? "Consultation Summary"
                            : "Consultation"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.contentSideNavPatient}>
                      <View>
                        <Text style={styles.textBold}>
                          {at(activeRow, "name")}
                        </Text>
                        <Text style={[styles.text, {marginTop: 2}]}>
                          {at(activeRow, "phone_number")}
                        </Text>
                        <Text style={[styles.text, {marginTop: 2}]}>
                          Age: {at(activeRow, "age")}
                        </Text>
                        <Text style={[styles.text, {marginTop: 2}]}>
                          Gender:{" "}
                          {at(activeRow, "gender") == 1
                            ? "Male"
                            : at(activeRow, "gender") == 2
                            ? "Female"
                            : "Others"}
                        </Text>
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
                    <Text style={styles.text}>Location:</Text>
                    <Text style={styles.textBold}>
                      {at(activeRow, "local_body_object.name")}
                    </Text>
                    <Text style={styles.textBold}>
                      {at(activeRow, "district_object.name")}
                    </Text>
                    <Text style={styles.text}>Medications:</Text>
                    {at(activeRow, "medical_history")
                      ? at(activeRow, "medical_history").map((item) => {
                          return (
                            <Text style={styles.textBold}>{item.disease}</Text>
                          );
                        })
                      : null}
                    <Text style={styles.text}>Symptoms:</Text>
                   {at(activeRow, 'symptoms') ?Object.keys(at(activeRow, 'symptoms')).map((item) => {
                     return(
                      <Text style={[styles.textBold, {textTransform: 'capitalize'}]}>{activeRow.symptoms[item] } {item}</Text>
                     )
                   }) : null}
                    <Text style={[styles.text, { marginTop: 20, marginBottom: 1 }]}>
                      Contact With Carrier:{" "}
                      {at(activeRow, "contact_with_confirmed_carrier")
                        ? "Yes"
                        : "No"}
                    </Text>
                    <Text style={[styles.text, { marginVertical: 1 }]}>
                      Contact With Suspected Carrier:{" "}
                      {at(activeRow, "contact_with_suspected_carrier")
                        ? "Yes"
                        : "No"}
                    </Text>
                    <Text style={[styles.text, { marginVertical: 1 }]}>
                      Travel History:{" "}
                      {at(activeRow, "past_travel") ? "Yes" : "No"}
                    </Text>
                    <Text style={[styles.text, { marginVertical: 1 }]}>
                      Aged Dependants:{" "}
                      {at(activeRow, "number_of_aged_dependents")
                        ? "Yes"
                        : "No"}
                    </Text>
                    <Text style={[styles.text, { marginVertical: 1 }]}>
                      Relatives with Chronic Disease:{" "}
                      {at(activeRow, "number_of_chronic_diseased_dependents")
                        ? "Yes"
                        : "No"}
                    </Text>

                    <View>
                      <Text style={[styles.textBold, { marginTop: 20 }]}>
                        Select an Action:
                      </Text>

                      <RNPickerSelect
                        style={pickerSelectStyles}
                        placeholder={placeholderAction}
                        value={
                          actionValueVolunteer
                            ? actionValueVolunteer
                            : at(activeRow, "status")
                        }
                        onValueChange={(value) => {
                          if (value && value !== actionValueVolunteer) {
                            setActionValueVolunteer(value);
                          }
                        }}
                        items={actionDataVolunteer}
                      />
                    </View>
                    <View
                      style={{
                        marginTop: 20,
                        display: "flex",
                        flexDirection: "row",
                        width: width * 0.2,
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <ContainedButton
                        width={80}
                        textColor={theme.white}
                        color={theme.success}
                        text={"Save"}
                        onPress={() => handleStateAction()}
                      />

                      <ContainedButton
                        width={80}
                        mLeft={20}
                        textColor={theme.white}
                        onPress={() => {
                          setActiveRow(null),setDidNavRootView('COUNT'); setActive(null);
                        }}
                        color={theme.button}
                        text={"Cancel"}
                      />
                    </View>
                  </View>
                ): 
                (sideNavRootView === 'ADD_PATIENT') ?
                <View style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  padding: 10,
                  marginTop: 20,
                  width: width * 0.2
                }}>
                  <Text style={{color: theme.button, fontSize: 18, fontWeight: 'bold'}}>Add New Patient</Text>
                <AddNewPatient handlePatientCreate={(data) => handlePatientCreate(data)} />
                <View style={
                 { width: width * 0.2,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }

                }>
                <ContainedButton text="Cancel"  width={80}
                        textColor={theme.white} 
                        onPress={() => setDidNavRootView("COUNT")} color={theme.button}  />
                        </View>
                </View>
                :null
                }
              </ScrollView>
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
