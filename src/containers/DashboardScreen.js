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
  CheckBox,
  ScrollView,
  ActivityIndicator,
  Linking,
  Image,
} from "react-native";
import useTheme from "../constants/theme";
import Input from "../components/input/Input";
import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
import i18n from "i18n-js";
import * as Device from "expo-device";
import Table from "../components/table/Table";
import { ContainedButton } from "../components/button/Button";
import { executeData, clearData } from "../store/actions/ExecuteData";
import { clearStore } from "../store/actions/SaveAsync";
import Menu from "../components/menu/Menu";
import AddNewPatient from "./AddNewPatient";
import moment from 'moment';
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
      width: Math.round(width * 0.7 - 100),
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
      width: width * 0.3,
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
      width: width * 0.7,
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
      width: Math.round(width * 0.7 - 100),
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
      width: Math.round(width * 0.7 - 220),
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
      fontSize: 12,
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
  const [sideTab, setSideTab] = useState("PATIENT");
  const [status, setStatus] = useState("All");
  const [patients, setPatients] = useState([]);
  const [loader, setLoader] = useState(false);

  const [page, setPage] = useState(1);
  const [countData, setCountData] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  const [actionValueVolunteer, setActionValueVolunteer] = useState(null);
  const [
    actionValueConsulatationSymptoms,
    setActionConsulatationSymptoms,
  ] = useState([]);
  const [
    actionValueConsulatationCategory,
    setActionConsulatationCategory,
  ] = useState(null);
  const [
    actionValueConsulatationDecision,
    setActionConsulatationDecision,
  ] = useState("HI");
  const [active, setActive] = useState(null);
  const [filterMenu, setFilterMenu] = useState(false);
  const [logoutMenu, setLogoutMenu] = useState(false);
  const [sideNavRootView, setDidNavRootView] = useState("COUNT");
  const [revealPhone, setRevealPhone] = useState(false);
  const [medicationSymptoms, setMedicationSymptoms] = useState(null);
  const [medication, setMedication] = useState(null);
  const [examination, setExamination] = useState(null);
  const [otherSymptoms, setOtherSymptoms] = useState(null);
  const [admitted, setAdmitted] = useState(false);
  const [symptomsMenu, setSymptomsMenu] = useState(false);
  const [actionDataVolunteer, setActionDataVolunteer] = useState([]);

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
        setLoader(true);
      }
      if(at(executeDataResponse, 'UPDATE_STATE.isDone')) {
        if(patients.length > 0) {
          dispatch(
            clearData({
              type: "FETCH_PATIENTS",
            })
          );
          dispatch(
            clearData({
              type: "UPDATE_STATE",
            })
          );
          setPatients([]);
        }
      }
      if (!at(executeDataResponse, "GET_COUNT.isInitiated")) {
        dispatch(
          executeData({
            method: "GET",
            type: "GET_COUNT",
            token: at(asyncState, "token"),
          })
        );
        setLoader(true);
      }
     
      if (
        at(executeDataResponse, "CONSULTATION_DOCTOR.isDone") ||
        at(executeDataResponse, "CONSULTATION_DOCTOR.isError")
      ) {
        setLoader(false);
        setDidNavRootView("COUNT");
        if(patients.length > 0) {
          dispatch(
            clearData({
              type: "FETCH_PATIENTS",
            })
          );
          dispatch(
            clearData({
              type: "CONSULTATION_DOCTOR",
            })
          );
          setPatients([]);
        }
       
      }
      if (at(executeDataResponse, "GET_COUNT.isDone")) {
        if (!countData) {
          setCountData(at(executeDataResponse, "GET_COUNT.data"));
          setLoader(false);
        }
      }
      if (at(executeDataResponse, `FETCH_PATIENTS.${page}.isDone`)) {
        if (patients.length === 0) {
          setPatients(
            at(executeDataResponse, `FETCH_PATIENTS.${page}.data.entries`)
          );
          setLoader(false);
        }
      }
    }
  });
  const actionDataVolunteerList = [
    { label: "NOT ATTENDED", value: "not_attended" },
    { label: "ATTEND", value: "attending_by_volunteer" },
    { label: "FORWARD TO DOCTOR", value: "forwarded_to_doctor" },
    { label: "CLOSE CASE", value: "closed_by_volunteer" },
  ];

  const handleRowView = (id, row) => {
    setDidNavRootView("PATIENT");
    setActiveRow(row);
    setActive(id);
    
    setActionConsulatationSymptoms([]);
    setActionConsulatationDecision("HI");
    setActionConsulatationCategory(null);
    let actionData = [...actionDataVolunteerList];
    if(row.status === 'not_attended') {
      actionData.splice(0, 1);
      setActionDataVolunteer(actionData)
    }
    if(row.status === 'attending_by_volunteer') {
      actionData.splice(0, 2);

      setActionDataVolunteer(actionData)
    }
    if(row.status === 'forwarded_to_doctor') {
      actionData.splice(0, 3);

      setActionDataVolunteer(actionData)
    }
    if(row.status === 'closed_by_doctor') {
      actionData.splice(0, 3);

      setActionDataVolunteer(actionData)
    }
    if(row.status === 'closed_by_volunteer') {
      actionData.splice(0, 4);

      setActionDataVolunteer(actionData)
    }
  };


  

  const actionDataSymptoms = [
    { value: 1, label: "ASYMPTOMATIC" },
    { value: 2, label: "FEVER" },
    { value: 3, label: "SORE THROAT" },
    { value: 4, label: "COUGH" },
    { value: 5, label: "BREATHLESSNESS" },
    { value: 6, label: "MYALGIA" },
    { value: 7, label: "ABDOMINAL DISCOMFORT" },
    { value: 8, label: "VOMITING/DIARRHOEA" },
    { value: 9, label: "OTHERS" },
  ];

  const actionDataCategory = [
    { value: "Category-A", label: "Mild(Category A)" },
    { value: "Category-B", label: "Moderate(Category B)" },
    { value: "Category-C", label: "Severe(Category C)" },
  ];
  const actionDataDecision = [
    { value: "HI", label: "Home Isolation" },
    { value: "A", label: "Admission" },
    { value: "R", label: "Refer to another Hospital" },
  ];

  const actionDataDoctor = [
    { label: "ATTEND", value: "attending_by_doctor" },
    { label: "CLOSE CASE", value: "closed_by_doctor" },
  ];
  const actionDataDoctorMenu = [
    { label: "ALL", value: "All" },
    { label: "FORWARDED TO DOCTOR", value: "forwarded_to_doctor" },
    { label: "ATTENDED", value: "attending_by_doctor" },
    { label: "CLOSED CASES", value: "closed_by_doctor" },
  ];

  const actionDataVolunteerMenu = [
    { label: "ALL", value: "All" },
    { label: "NOT ATTENDED", value: "not_attended" },
    { label: "ATTENDED", value: "attending_by_volunteer" },
    { label: "FORWARDED TO DOCTOR", value: "forwarded_to_doctor" },
    { label: "CLOSED BY DOCTOR", value: "closed_by_doctor" },
    { label: "CLOSED CASES", value: "closed_by_volunteer" },
    
  ];
  const profileMenu = [{ label: "LOGOUT", value: "logout" }];
  var colorArray = [
    "#FFF5E5",
    "#FAFCE9",
    "#F2F9EC",
    "#FFFF99",
    "#E5FFFA",
    "#FFE5F0",
    "#E5FEFF",
    "#E6F7FF",
    "#E5E5FF",
    "#F2E5FF",
    "#FAEAF8",
    "#FEE7E8",
  ];

  const placeholderAction = {
    label: "Select an Action",
    value: null,
    color: theme.paragraph,
  };
  const placeholderActionSymptoms = {
    label: "Select a Symptom",
    value: null,
    color: theme.paragraph,
  };
  const placeholderActionDecision = {
    label: "Select a Decision",
    value: null,
    color: theme.paragraph,
  };
  const placeholderActionCategory = {
    label: "Select Suspect Category",
    value: null,
    color: theme.paragraph,
  };

  const handlePatientCreate = (data) => {
    setDidNavRootView("COUNT");
    setLoader(true);
    dispatch(
      executeData({
        type: "UPDATE_STATE",
        method: "GET",
        token: at(asyncState, "token"),
        req: data,
      })
    );
    
  };

  

  const handleStateAction =  () => {
    ReloadCount();
    let requestId = at(activeRow, "request_id");
    setLoader(true);
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
   
    // setPatients([]);
    setActiveRow(null)
    setDidNavRootView('COUNT');
    setActionValueVolunteer(null);
    // dispatch(
    //   clearData({
    //     type: "FETCH_PATIENTS",
    //   })
    // );

  };
  const handleMenuProfile = (item) => {
    setLogoutMenu(false);
    dispatch(clearStore());
    window.location.reload();
  };

  const handleMenuPress = (item) => {
    if (item) {
      setFilterMenu(false);
      dispatch(
        clearData({
          type: "FETCH_PATIENTS",
        })
      );
      setPatients([]);
      setStatus(item.value);
    }
  };

  const ReloadCount = () => {
    dispatch(clearData({
      type: 'GET_COUNT'
    }))
  }

  const pageNavigation = (page) => {
    if (page) {
      dispatch(
        clearData({
          type: "FETCH_PATIENTS",
        })
      );
      setPatients([]);
      setPage(page);
    }
  };

  const handleConsultation = (id) => {
    setLoader(true);
    ReloadCount();
    let req = {
      suggestion: actionValueConsulatationDecision,
      category: actionValueConsulatationCategory,
      admitted: admitted,
      examination_details: examination,
      existing_medication: medicationSymptoms,
      prescribed_medication: medication,
      patient: id,
      symptoms: actionValueConsulatationSymptoms,
      request_id: at(activeRow, "request_id"),
    };
    if(!actionValueConsulatationSymptoms.length > 0) {
      req.symptoms= [1]
    }
    if (otherSymptoms) {
      req.other_symptoms = otherSymptoms;
    }
    dispatch(
      executeData({
        type: "CONSULTATION_DOCTOR",
        method: "POST",
        token: at(asyncState, "token"),
        req: JSON.stringify(req),
      })
    );
    // setPatients([]);
    // dispatch(clearData({
    //   type: 'FETCH_PATIENTS'
    // }))
  };

  return (
    <View style={styles.root}>
      {loader && (
        <ActivityIndicator
          size="large"
          style={{
            position: "absolute",
            zIndex: 20,
            width: width,
            height: height,
            alignItems: "center",
            justifyContent: "center",
          }}
          animating={loader}
          color={theme.button}
        />
      )}

      <View style={styles.container}>
        {desktop ? (
          <View style={styles.desktopContainer}>
            <View style={styles.mainContainer}>
              <View style={styles.topNav}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    display: "flex",
                  }}
                >
                  <Image
                    resizeMode="contain"
                    style={{ width: 60, height: 60, opacity: 0.9 }}
                    source={require("./icon.png")}
                  />
                  <Text style={[styles.headerText, { color: theme.button }]}>
                    {i18n.t("title")}
                  </Text>
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

                  {/* <View style={[styles.tabBlock, {marginHorizontal: 0, marginRight: 10}]}>
                    <Text
                      style={[
                        styles.tabText,
                        tab === "SETTINGS" ? styles.tabTextActive : null,
                      ]}
                    >
                      Settings
                    </Text>
                  </View> */}
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
                    {/* <View
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
                    </View> */}
                  </View>
                  <View style={styles.filters}>
                    {at(asyncState, "metaData.ROLE") === "IMA_VOLUNTEER" ? (
                      <TouchableOpacity
                        onPress={() => setDidNavRootView("ADD_PATIENT")}
                        style={styles.addNew}
                      >
                        <AntDesign name="plus" size={20} color={theme.accent} />
                      </TouchableOpacity>
                    ) : null}
                    <TouchableOpacity
                      onPress={() => setFilterMenu(!filterMenu)}
                      style={styles.filterIcon}
                    >
                      <AntDesign name="filter" size={20} color={theme.button} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.content}>
                  {/* Table */}
                  <Table
                    pageNavigation={(page) => pageNavigation(page)}
                    page={
                      at(
                        executeDataResponse,
                        `FETCH_PATIENTS.${page}.data.page`
                      )
                        ? parseInt(
                            at(
                              executeDataResponse,
                              `FETCH_PATIENTS.${page}.data.page`
                            ),
                            10
                          )
                        : 0
                    }
                    doctor={
                      at(asyncState, "metaData.ROLE") === "DOCTOR"
                        ? true
                        : false
                    }
                    width={Math.round(width * 0.7 - 100)}
                    active={active}
                    pageCount={
                      at(
                        executeDataResponse,
                        `FETCH_PATIENTS.${page}.data.pageCount`
                      )
                        ? parseInt(
                            at(
                              executeDataResponse,
                              `FETCH_PATIENTS.${page}.data.pageCount`
                            ),
                            10
                          )
                        : 0
                    }
                    handleRowView={(id, row) => handleRowView(id, row)}
                    rows={patients}
                  />
                  {/* TableEnd */}
                  {filterMenu ? (
                    <Menu
                      height={
                        at(asyncState, "metaData.ROLE") === "DOCTOR" ? 200 : 250
                      }
                      onPress={(item) => handleMenuPress(item)}
                      data={
                        at(asyncState, "metaData.ROLE") === "DOCTOR"
                          ? actionDataDoctorMenu
                          : actionDataVolunteerMenu
                      }
                    />
                  ) : null}
                </View>
              </View>
            </View>
            <View style={styles.sideNav}>
              {logoutMenu ? (
                <Menu
                  data={profileMenu}
                  backgroundColor={theme.white}
                  onPress={(item) => handleMenuProfile(item)}
                  height={40}
                  right={60}
                />
              ) : null}
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
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "600",
                      color: theme.paragraph,
                    }}
                  >
                    {( at(asyncState, "metaData.ROLE") && at(asyncState, "metaData.district"))
                      ? at(asyncState, "metaData.district").replace("_", " ")
                      : "Unknown"}
                  </Text>
                </View>
              </View>
              <ScrollView>
                {sideNavRootView === "COUNT" ? (
                  <View style={styles.sideNavContentHome}>
                    {countData
                      ? Object.keys(countData).map((key, idx) => {
                          return (
                            <View key={idx} style={styles.patientDataCard}>
                              <View
                                style={[
                                  styles.iconContainer,
                                  {
                                    backgroundColor: colorArray[idx],
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
                ) : sideNavRootView === "PATIENT" ? (
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
                      <TouchableOpacity
                        onPress={() => {
                          if (sideTab !== "PATIENT") {
                            setSideTab("PATIENT");
                          }
                        }}
                        style={
                          sideTab === "PATIENT"
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
                            sideTab === "PATIENT" ? styles.tabTextActive : null,
                          ]}
                        >
                          Patient Details
                        </Text>
                      </TouchableOpacity>
                      {!(
                        at(asyncState, "metaData.ROLE") === "IMA_VOLUNTEER"
                      ) ? (
                        <TouchableOpacity
                          onPress={() => {
                            if (sideTab !== "CONSULTATION") {
                              setSideTab("CONSULTATION");
                            }
                          }}
                          style={
                            sideTab === "CONSULTATION"
                              ? [styles.tabBlock, styles.tabBlockActive]
                              : [styles.tabBlock]
                          }
                        >
                          <Text
                            style={[
                              styles.tabText,
                              sideTab === "CONSULTATION"
                                ? styles.tabTextActive
                                : null,
                            ]}
                          >
                            {at(asyncState, "metaData.ROLE") === "IMA_VOLUNTEER"
                              ? "Consultation Summary"
                              : "Consultation"}
                          </Text>
                        </TouchableOpacity>
                      ) : null}
                    </View>
                    {sideTab === "PATIENT" ? (
                      <View>
                        <View style={styles.contentSideNavPatient}>
                          <View>
                            <Text style={styles.textBold}>
                              {at(activeRow, "name")}
                            </Text>
                            {revealPhone ? (
                              <Text style={[styles.text, { marginTop: 2 }]}>
                                {at(activeRow, "phone_number")}
                              </Text>
                            ) : null}
                            <Text style={[styles.text, { marginTop: 2 }]}>
                              Age: {at(activeRow, "age")}
                            </Text>
                            <Text style={[styles.text, { marginTop: 2 }]}>
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
                            onPress={() => {
                              setRevealPhone(true);
                              Linking.openURL(
                                `tel:${at(activeRow, "phone_number")}`
                              );
                            }}
                            text={"Call"}
                            prefix={true}
                            icon="phone"
                          />
                        </View>
                        <Text style={styles.text}>Location:</Text>
                        <Text style={[styles.textBold, { width: width * 0.2 }]}>
                          {at(activeRow, "local_body_object.name")}
                        </Text>
                        <Text style={styles.textBold}>
                          {at(activeRow, "district_object.name")}
                        </Text>
                        <Text style={styles.text}>Medications:</Text>
                        {at(activeRow, "medical_history")
                          ? at(activeRow, "medical_history").map(
                              (item, idx) => {
                                return (
                                  <Text key={idx} style={styles.textBold}>
                                    {item.disease}
                                  </Text>
                                );
                              }
                            )
                          : null}
                        {at(activeRow, "symptoms") ? (
                          <Text style={styles.text}>Symptoms:</Text>
                        ) : null}
                        {at(activeRow, "symptoms")
                          ? Object.keys(at(activeRow, "symptoms")).map(
                              (item, idx) => {
                                return (
                                  <Text
                                    key={idx}
                                    style={[
                                      styles.textBold,
                                      { textTransform: "capitalize" },
                                    ]}
                                  >
                                    {activeRow.symptoms[item]} {item}
                                  </Text>
                                );
                              }
                            )
                          : null}
                        <Text
                          style={[
                            styles.text,
                            { marginTop: 20, marginBottom: 1 },
                          ]}
                        >
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
                          {at(
                            activeRow,
                            "number_of_chronic_diseased_dependents"
                          )
                            ? "Yes"
                            : "No"}
                        </Text>

                        {at(activeRow, "last_consultation") ? (
                          <Text
                            style={[
                              styles.textBold,
                              { marginTop: 20, color: theme.button },
                            ]}
                          >
                            Last Consultation Details:{" "}
                          </Text>
                        ) : null}
                         {at(activeRow, "last_consultation") ? (
                          <Text
                            style={[
                              styles.textBold,
                              { marginTop: 4, color: theme.button },
                            ]}
                          >
                            Consultation Time:{" "} {moment(at(activeRow, 'updated_at' )).format('MMMM Do YYYY, h:mm:ss a')}
                          </Text>
                        ) : null}
                        {at(activeRow, "last_consultation.suggestion_text") ? (
                          <Text
                            style={[
                              styles.text,
                              { marginTop: 4, textTransform: "capitalize" },
                            ]}
                          >
                            Suggestion:{" "}
                            {at(activeRow, "last_consultation.suggestion_text").toLowerCase()}
                          </Text>
                        ) : null}
                         {at(activeRow, "last_consultation.symptoms") ?<Text
                                  style={[
                                    styles.textBold,
                                    { marginTop: 4, textTransform: "capitalize" },
                                  ]}
                                >
                                 
                                  Symptoms: 
                                </Text> : null}
                       {at(activeRow, "last_consultation.symptoms") ? (
                          at(activeRow, "last_consultation.symptoms").map((value) => {
                            return actionDataSymptoms.map((item) => {
                              if(item.value === value && item.label !== 'OTHERS') {
                                return(
                                  <Text
                                  style={[
                                    styles.text,
                                    { marginTop: 4, textTransform: "capitalize" },
                                  ]}
                                >
                                 
                                  {item.label.toLowerCase()}
                                </Text>
                                )
                              }  else if(item.label === 'OTHERS' && item.value === value) {
                                <Text
                                style={[
                                  styles.textBold,
                                  { marginTop: 4, textTransform: "capitalize" },
                                ]}
                              >
                                Other Symptoms:{" "}
                                { at(activeRow, "last_consultation.other_symptoms").toLowerCase()}
                              </Text>
                              }
                              return null;
                            })
                           
                          })
                         
                        ) : null}
                        {at(activeRow, "last_consultation.category") ? (
                          <Text
                            style={[
                              styles.textBold,
                              { marginTop: 4, textTransform: "capitalize" },
                            ]}
                          >
                            Category:{" "}
                            {at(activeRow, "last_consultation.category")}
                          </Text>
                        ) : null}
                        {at(activeRow, "last_consultation.examination_details") ? (
                          <Text
                            style={[
                              styles.textBold,
                              { marginTop: 4, textTransform: "capitalize" },
                            ]}
                          >
                            Examination Details:{" "}
                            {at(activeRow, "last_consultation.examination_details")}
                          </Text>
                        ) : null}
                        {at(activeRow, "last_consultation.existing_medication") ? (
                          <Text
                            style={[
                              styles.textBold,
                              { marginTop: 4, textTransform: "capitalize" },
                            ]}
                          >
                            Existing Medication:{" "}
                            {at(activeRow, "last_consultation.existing_medication")}
                          </Text>
                        ) : null}
                         {at(activeRow, "last_consultation.prescribed_medication") ? (
                          <Text
                            style={[
                              styles.textBold,
                              { marginTop: 4, textTransform: "capitalize" },
                            ]}
                          >
                            Prescribed Medication:{" "}
                            {at(activeRow, "last_consultation.prescribed_medication")}
                          </Text>
                        ) : null}


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
                              if (value && value !== actionValueVolunteer && value !== 'Select an Action') {
                                setActionValueVolunteer(value);
                              } else if(value && value === 'Select an Action') {
                                setActionValueVolunteer(null);
                              }
                            }}
                            items={
                              at(asyncState, "metaData.ROLE") === "DOCTOR"
                                ? actionDataDoctor
                                : actionDataVolunteer
                            }
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
                            opacity={actionValueVolunteer ?  1 : 0.5}
                            disabled={actionValueVolunteer ?  false : true}
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
                              setActiveRow(null), setDidNavRootView("COUNT");
                              setActive(null);
                            }}
                            color={theme.button}
                            text={"Cancel"}
                          />
                        </View>
                      </View>
                    ) : (
                      <View
                        style={[
                          styles.sideNavContentPatient,
                          { width: width * 0.2 },
                        ]}
                      >
                        {symptomsMenu ? (
                          <View
                            style={{
                              position: "absolute",
                              width: 230,
                              height: 330,
                              backgroundColor: theme.dashboard,
                              zIndex: 10,
                              top: 40,
                              right: 0,
                              borderRadius: 5,
                              padding: 10,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              borderColor: theme.dashboard,
                              borderWidth: 1,
                            }}
                          >
                            {actionDataSymptoms.length > 0
                              ? actionDataSymptoms.map((item) => {
                                  return (
                                    <View
                                      style={{
                                        width: 180,
                                        backgroundColor: theme.dashboard,
                                        borderBottomColor: theme.dashboard,
                                        borderBottomWidth: 1,
                                        height: 30,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-start",
                                        flexDirection: "row",
                                      }}
                                    >
                                      <CheckBox
                                        onValueChange={() => {
                                          let symptomsData = [
                                            ...actionValueConsulatationSymptoms,
                                          ];
                                          if (
                                            !symptomsData.includes(item.value)
                                          ) {
                                            symptomsData.push(item.value);
                                            setActionConsulatationSymptoms(
                                              symptomsData
                                            );
                                          } else {
                                            symptomsData.splice(
                                              symptomsData.indexOf(item.value),
                                              1
                                            );
                                            setActionConsulatationSymptoms(
                                              symptomsData
                                            );
                                          }
                                        }}
                                        style={{
                                          marginRight: 10,
                                        }}
                                        value={actionValueConsulatationSymptoms.includes(
                                          item.value
                                        )}
                                      />
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          fontWeight: "bold",
                                          color: theme.text,
                                        }}
                                      >
                                        {item.label}
                                      </Text>
                                    </View>
                                  );
                                })
                              : null}
                            <ContainedButton
                              onPress={() => setSymptomsMenu(false)}
                              width={60}
                              height={30}
                              textColor={theme.white}
                              text={"Save"}
                            />
                          </View>
                        ) : null}
                        <TouchableOpacity
                          onPress={() => setSymptomsMenu(!symptomsMenu)}
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: theme.button,
                            display: "flex",
                            width: width * 0.2,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            height: 35,
                          }}
                        >
                          <Text style={styles.text}>Choose Symptoms</Text>
                          <AntDesign
                            name="down"
                            ccolor={theme.text}
                            size={12}
                          />
                        </TouchableOpacity>

                        {/* <RNPickerSelect
                          style={pickerSelectStyles}
                          placeholder={placeholderActionSymptoms}
                          value={actionValueConsulatationSymptoms}
                          onValueChange={(value) => {
                            if (
                              value &&
                              value !== actionValueConsulatationSymptoms
                            ) {
                              setActionConsulatationSymptoms(value);
                            }
                          }}
                          items={actionDataSymptoms}
                        /> */}

                        <View
                          style={{
                            flexDirection: "row",
                            display: "flex",
                            overflow: "scroll",
                            alignItems: "center",
                            marginVertical: 10,
                            justifyContent: "flex-start",
                            width: width * 0.2,
                          }}
                        >
                          {actionValueConsulatationSymptoms.map((value) => {
                            return actionDataSymptoms.map((item, idx) => {
                              if (
                                item.value === value &&
                                item.label !== "OTHERS"
                              ) {
                                return (
                                  <View
                                    style={{
                                      height: 15,
                                      marginHorizontal: 5,
                                      padding: 5,
                                      alignItems: "center",
                                      justifyContent: "center",
                                      backgroundColor: theme.button,
                                      borderRadius: 8,
                                    }}
                                    key={idx}
                                  >
                                    <Text
                                      style={{
                                        fontSize: 8,
                                        fontWeight: "bold",
                                        color: theme.white,
                                      }}
                                    >
                                      {item.label}
                                    </Text>
                                  </View>
                                );
                              }
                              return null;
                            });
                          })}
                        </View>
                        {actionValueConsulatationSymptoms.includes(9) ? (
                          <View>
                            <Text style={styles.text}>
                              Mention Other Symptoms:
                            </Text>
                            <Input
                              backgroundColor={theme.accentDashboard}
                              width={width * 0.2}
                              onChange={(e) => setOtherSymptoms(e)}
                              multiline={true}
                              size={12}
                              numberOfLines={6}
                              placeholder="Optional Information"
                              height={70}
                            />
                          </View>
                        ) : null}
                        <Text style={styles.text}>
                          Medication, if any for the above-mentioned symptoms:
                        </Text>
                        <Input
                          backgroundColor={theme.accentDashboard}
                          width={width * 0.2}
                          onChange={(e) => setMedicationSymptoms(e)}
                          multiline={true}
                          size={12}
                          numberOfLines={6}
                          placeholder="Optional Information"
                          height={70}
                        />
                        <Text style={styles.text}>Examination Details:</Text>
                        <Input
                          backgroundColor={theme.accentDashboard}
                          width={width * 0.2}
                          onChange={(e) => setExamination(e)}
                          multiline={true}
                          numberOfLines={6}
                          size={12}
                          placeholder="Optional Information"
                          height={70}
                        />
                        <Text style={styles.text}>Prescribed Medication:</Text>
                        <Input
                          backgroundColor={theme.accentDashboard}
                          width={width * 0.2}
                          multiline={true}
                          onChange={(e) => setMedication(e)}
                          numberOfLines={6}
                          size={12}
                          placeholder="Optional Information"
                          height={70}
                        />
                        <Text style={styles.text}>Category:</Text>

                        <RNPickerSelect
                          style={pickerSelectStyles}
                          placeholder={placeholderActionCategory}
                          value={actionValueConsulatationCategory}
                          onValueChange={(value) => {
                            if (
                              value &&
                              value !== actionValueConsulatationCategory
                            ) {
                              setActionConsulatationCategory(value);
                            }
                          }}
                          items={actionDataCategory}
                        />
                        <Text style={styles.text}>
                          Decision after Consultation:
                        </Text>

                        <RNPickerSelect
                          style={pickerSelectStyles}
                          placeholder={placeholderActionDecision}
                          value={actionValueConsulatationDecision}
                          onValueChange={(value) => {
                            if (
                              value &&
                              value !== actionValueConsulatationDecision
                            ) {
                              setActionConsulatationDecision(value);
                            }
                          }}
                          items={actionDataDecision}
                        />
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-end",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Text style={styles.text}>Admitted:</Text>
                            <CheckBox
                              value={admitted}
                              onValueChange={() => {
                                setAdmitted(!admitted);
                              }}
                            />
                          </View>
                          <ContainedButton
                            width={80}
                            mLeft={20}
                            textColor={theme.white}
                            onPress={() => {
                              handleConsultation(at(activeRow, "id"));
                            }}
                            color={theme.success}
                            text={"Save"}
                          />
                          <ContainedButton
                            width={80}
                            mLeft={30}
                            textColor={theme.white}
                            onPress={() => {
                              setActiveRow(null), setDidNavRootView("COUNT");
                              setActive(null);
                            }}
                            color={theme.button}
                            text={"Cancel"}
                          />
                        </View>
                      </View>
                    )}
                  </View>
                ) : sideNavRootView === "ADD_PATIENT" ? (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      padding: 10,
                      marginTop: 20,
                      width: width * 0.2,
                    }}
                  >
                    <Text
                      style={{
                        color: theme.button,
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Add New Patient
                    </Text>
                    <AddNewPatient
                      handlePatientCreate={(data) => handlePatientCreate(data)}
                    />
                    <View
                      style={{
                        width: width * 0.2,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ContainedButton
                        text="Cancel"
                        width={80}
                        textColor={theme.white}
                        onPress={() => setDidNavRootView("COUNT")}
                        color={theme.button}
                      />
                    </View>
                  </View>
                ) : null}
              </ScrollView>
            </View>
          </View>
        ) : (
          <Text>
            Oops! Not available in Mobile View! Please Try Using Desktop.
          </Text>
        )}
      </View>
    </View>
  );
};

export default DashboardScreen;
