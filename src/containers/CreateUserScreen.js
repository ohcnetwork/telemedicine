import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  CheckBox,
  TouchableOpacity,
  Dimensions,
  Text
} from "react-native";
import useTheme from "../constants/theme";
import at from "v-at";
import TextInput from "../components/input/Input";
import { saveToStore } from "../store/actions/SaveAsync";
import { executeData, clearData } from "../store/actions/ExecuteData";
import { AntDesign } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import i18n from "i18n-js";
import { ContainedButton, OutlinedButton } from "../components/button/Button";

const AuthScreen = ({ navigation, props }) => {
  let dispatch = useDispatch();
  const [asyncState, setAsyncState] = useState({});

  let saveAsync = useSelector(state => {
    return state.AsyncStorageReducer;
  });
  let executeDataResponse = useSelector(state => {
    return state.ExecuteData;
  });
  Promise.resolve(saveAsync).then(value => {
    setAsyncState(value);
  });

  let theme = useTheme();
  let width = Math.round(Dimensions.get("window").width);
  let height = Math.round(Dimensions.get("window").height);
  const styles = StyleSheet.create({
    root: {
      backgroundColor: theme.background,
      flex: 1,
      height: height,
      width: width
    },
    inputContainer: {
      height: height,
      width: width,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    textContainer: {
      width: width * 0.8,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      marginBottom: 20
    },
    labelText: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text
    },
    labelText2: {
      fontSize: 12,
      fontWeight: "500",
      color: theme.paragraph
    },
    labelTextError: {
      fontSize: 12,
      fontWeight: "500",
      color: theme.error
    },
    selectTextFieldContainer: {
      marginBottom: 20,
      borderBottomColor: theme.button,
      borderBottomWidth: 2,
      width: width * 0.8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20
    },
    textFieldContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20
    },
    datePicker: {
      display: "flex",
      flexDirection: "row",
      width: width * 0.8,
      justifyContent: "space-evenly",
      alignItems: "center",
      paddingBottom: 5
    },
    buttonFieldContainer: {
      width: width * 0.8,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20
    },
  });
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      width: width * 0.8,
      height: 50,
      backgroundColor: theme.background,
      color: theme.text,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderBottomWidth: 0,
      padding: 8
    },
    inputAndroid: {
      width: width * 0.8,
      height: 50,
      backgroundColor: theme.background,
      color: theme.text,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderBottomWidth: 0,
      padding: 8
    }
  });

  //   const checkToken = async () => {
  //     let storage = await AsyncStorage.getItem("@storage");

  //     storage = JSON.parse(storage);
  //     if (storage && storage.token && (storage.metaData || storage.metaData.primary)) {
  //       navigation.navigate("home");
  //     }
  //   };
  //   useEffect(() => {
  //     checkToken();
  //   });

  const [view, setView] = useState("NAME");
  const [nameError, setNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [age, setAge] = useState(null);
  const [gender, selectedGender] = useState(null);
  const [name, setName] = useState(null);

  const [carrier, setCarrier] = useState(false);
  const [suspectCarrier, setSuspectCarrier] = useState(false);
  const [chronicDisease, setChronicDisease] = useState({});

  const handleNavigation = value => {
    switch (view) {
      case "NAME":
        if (name) {
          setView("AGE");
        } else {
          setNameError(true);
        }
        break;
      case "AGE":
        if (age) {
          setView("GENDER");
        } else {
          setAgeError(true);
        }
        break;
      case "GENDER":
        if (gender) {
          setView("CARRIER");
        } else {
          setGenderError(true);
        };
        break;
      case "CARRIER":
        setCarrier(value);
        setView("CARRIER_SUSPECTED");
        break;
      case "CARRIER_SUSPECTED":
        setSuspectCarrier(value);

        setView("CHRONIC_DISEASE");
        break;
      case "CHRONIC_DISEASE":
        handleRiskScreenNav();

        break;
      default:
        break;
    }
  };

  const handleRiskScreenNav = () => {
    let data = { ...asyncState };
    if (data) {
      let dataExecute = {};
      dataExecute.name = name;
      dataExecute.contact_with_confirmed_carrier = carrier;
      dataExecute.contact_with_suspected_carrier = suspectCarrier;
      dataExecute.past_travel = data.metaData.past_travel;
      dataExecute.has_SARI = false;
      dataExecute.age = age;
      dataExecute.gender = gender === "Male" ? 1 : gender === "Female" ? 2 : 3;
      dataExecute.phone_number = data.metaData.phoneNumber;
      dataExecute.contact_with_carrier = carrier;
      dataExecute.local_body = data.metaData.local_body;
      dataExecute.district = data.metaData.district;
      dataExecute.no_of_people = data.metaData.no_of_people;
      dataExecute.number_of_aged_dependents = data.metaData.number_of_aged_dependents ? 1 : 0;
      dataExecute.number_of_chronic_diseased_dependents =
        data.metaData.number_of_chronic_diseased_dependents ?  1 : 0;
      dataExecute.state = 1;
      dataExecute.medical_history = chronicDisease;
      let state_object = {
        name: "Kerala"
      };
      dataExecute.state_object = state_object;

      dataExecute.local_body_object = data.metaData.local_body_object;
      delete dataExecute.local_body_object.id;

      dataExecute.district_object = data.metaData.district_object;
      delete dataExecute.district_object.id;
      dataExecute.primary = false;
      dispatch(
        executeData({
          req: JSON.stringify(dataExecute),
          type: "UPDATE_USER_DATA",
          token: asyncState.token,
          method: "POST"
        })
      );
      dispatch(
        saveToStore({
          metaData: {
            activeUser: name,
            multiple: true
          }
        })
      );
      navigation.navigate("home");
    }
  };

  const handleBackPress = () => {
    switch (view) {
      case "NAME":
        navigation.navigate("Home");
        break;
      case "AGE":
        setView("NAME");
        break;
      case "GENDER":
        setView("AGE");
        break;
      case "CARRIER":
        setView("GENDER");
        break;
      case "CARRIER_SUSPECTED":
        setView("CARRIER");
        break;
      case "CHRONIC_DISEASE":
        setView("CARRIER_SUSPECTED");
        break;
      default:
        break;
    }
  };
  //   const handleDateChange = (type, date) => {
  //     if (type === "dismissed") {
  //       setDateVisibile(false);
  //       return;
  //     }
  //     setDateVisibile(false);
  //     setAge(
  //       moment(date)
  //         .fromNow()
  //         .slice(0, 2)
  //     );
  //     setSelectedDate(moment(date).format("MMM Do YY"));
  //   };

  const handleNameInput = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>{i18n.t("enter_name")}</Text>
        </View>
        <View style={styles.textFieldContainer}>
          <TextInput
            borderColor={nameError ? theme.error : theme.button}
            onChange={e => {
              setNameError(false);
              setName(e);
            }}
          />
        </View>
        <TouchableOpacity onPress={handleNavigation}>
          <AntDesign
            name={nameError ? "exclamationcircle" : "rightcircle"}
            color={nameError ? theme.error : theme.button}
            size={50}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const handleDateInput = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>{i18n.t("enter_age")}</Text>
        </View>
        <View style={styles.textFieldContainer}>
          <TextInput
            borderColor={ageError ? theme.error : theme.button}
            onChange={e => {
              setAgeError(false);

              setAge(e);
            }}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity onPress={handleNavigation}>
          <AntDesign
            name={ageError ? "exclamationcircle" : "rightcircle"}
            color={ageError ? theme.error : theme.button}
            size={50}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const handleGenderInput = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>{i18n.t("enter_gender")}</Text>
        </View>
        <View
          style={{
            ...styles.selectTextFieldContainer,
            ...{ borderBottomColor: genderError ? theme.error : theme.button }
          }}
        >
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={placeholderGender}
            value={gender}
            onValueChange={value => {
              setGenderError(false);
              selectedGender(value);
            }}
            items={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
              { label: "Other", value: "Other" }
            ]}
          />
        </View>
        <TouchableOpacity onPress={handleNavigation}>
          <AntDesign
            name={genderError ? "exclamationcircle" : "rightcircle"}
            color={genderError ? theme.error : theme.button}
            size={50}
          />
        </TouchableOpacity>
      </View>
    );
  };

  //   const handleDateInput = () => {
  //     return (
  //       <View style={styles.inputContainer}>
  //         <View style={styles.textContainer}>
  //           <Text style={styles.labelText}>
  //             Please Enter Your Date of Birth...
  //           </Text>
  //         </View>
  //         <View style={styles.selectTextFieldContainer}>
  //           <TouchableOpacity
  //             onPress={() => setDateVisibile(true)}
  //             style={styles.datePicker}
  //           >
  //             <AntDesign name="calendar" color={theme.button} size={30} />
  //             <Text style={styles.labelText}>
  //               {selectedDate ? selectedDate : "Please Select Date of Birth"}
  //             </Text>
  //           </TouchableOpacity>
  //           {dateVisibile ? (
  //             <DateTimePicker
  //               //   timeZoneOffsetInMinutes={0}
  //               value={date}
  //               mode={"date"}
  //               maximumDate={new Date(2016, 12, 31)}
  //               minimumDate={new Date(1947, 7, 15)}
  //               //   is24Hour={true}
  //               display="default"
  //               onChange={(event, date) => handleDateChange(event.type, date)}
  //             />
  //           ) : null}
  //         </View>
  //         <TouchableOpacity>
  //           <AntDesign name="rightcircle" color={theme.button} size={50} />
  //         </TouchableOpacity>
  //       </View>
  //     );
  //   };

  const placeholderGender = {
    label: "Select Gender",
    value: null,
    color: theme.paragraph
  };

  const handleInputCarrier = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>{i18n.t("contact_carrier")}</Text>
        </View>

        <View style={styles.buttonFieldContainer}>
          <ContainedButton
            text={i18n.t("yes")}
            color={theme.success}
            textColor={theme.white}
            onPress={() => {
              handleNavigation(true);
            }}
          />
          <ContainedButton
            text={i18n.t("no")}
            color={theme.button}
            textColor={theme.white}
            onPress={() => {
              handleNavigation(false);
            }}
          />
        </View>
      </View>
    );
  };

  const handleInputCarrierSuspected = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>
            {i18n.t("contact_carrier_suspected")}
          </Text>
        </View>

        <View style={styles.buttonFieldContainer}>
          <ContainedButton
            text={i18n.t("yes")}
            color={theme.success}
            textColor={theme.white}
            onPress={() => {
              handleNavigation(true);
            }}
          />
          <ContainedButton
            text={i18n.t("no")}
            color={theme.button}
            textColor={theme.white}
            onPress={() => {
              handleNavigation(false);
            }}
          />
        </View>
      </View>
    );
  };

  const handleInputChronic = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>{i18n.t("previous_disease")}</Text>
          <Text style={styles.labelText2}>
            {i18n.t("previous_disease_hint")}
          </Text>
        </View>

        <View style={[styles.textContainer, { marginTop: 20 }]}>
          <View
            style={[
              styles.buttonFieldContainer,
              { justifyContent: "flex-start" }
            ]}
          >
            <CheckBox
              value={chronicDisease.Diabetes ? true : false}
              onValueChange={() =>
                setChronicDisease(value => {
                  return {
                    ...value,
                    ...{ Diabetes: value.Diabetes ? false : true }
                  };
                })
              }
            />
            <Text style={[styles.labelText, { fontSize: 14, marginLeft: 10 }]}>
              {i18n.t("diabetes")}
            </Text>
          </View>
          <View
            style={[
              styles.buttonFieldContainer,
              { justifyContent: "flex-start" }
            ]}
          >
            <CheckBox
              value={chronicDisease["Heart Disease"] ? true : false}
              onValueChange={() =>
                setChronicDisease(value => {
                  return {
                    ...value,
                    ...{
                      "Heart Disease": value["Heart Disease"] ? false : true
                    }
                  };
                })
              }
            />
            <Text style={[styles.labelText, { fontSize: 14, marginLeft: 10 }]}>
              {i18n.t("heart")}
            </Text>
          </View>
          <View
            style={[
              styles.buttonFieldContainer,
              { justifyContent: "flex-start" }
            ]}
          >
            <CheckBox
              value={chronicDisease.HyperTension ? true : false}
              onValueChange={() =>
                setChronicDisease(value => {
                  return {
                    ...value,
                    ...{ HyperTension: value.HyperTension ? false : true }
                  };
                })
              }
            />
            <Text style={[styles.labelText, { fontSize: 14, marginLeft: 10 }]}>
              {i18n.t("blood_pressure")}
            </Text>
          </View>
          <View
            style={[
              styles.buttonFieldContainer,
              { justifyContent: "flex-start" }
            ]}
          >
            <CheckBox
              value={chronicDisease["Lung Diseases/Asthma"] ? true : false}
              onValueChange={() =>
                setChronicDisease(value => {
                  return {
                    ...value,
                    ...{
                      "Lung Diseases/Asthma": value["Lung Diseases/Asthma"]
                        ? false
                        : true
                    }
                  };
                })
              }
            />
            <Text style={[styles.labelText, { fontSize: 14, marginLeft: 10 }]}>
              {i18n.t("lung_disease")}
            </Text>
          </View>
          <View
            style={[
              styles.buttonFieldContainer,
              { justifyContent: "flex-start" }
            ]}
          >
            <CheckBox
              value={chronicDisease.Cancer ? true : false}
              onValueChange={() =>
                setChronicDisease(value => {
                  return {
                    ...value,
                    ...{ Cancer: value.Cancer ? false : true }
                  };
                })
              }
            />
            <Text style={[styles.labelText, { fontSize: 14, marginLeft: 10 }]}>
              {i18n.t("cancer")}
            </Text>
          </View>

          <View
            style={[
              styles.buttonFieldContainer,
              { justifyContent: "flex-start" }
            ]}
          >
            <CheckBox
              value={chronicDisease["Kidney Diseases"] ? true : false}
              onValueChange={() =>
                setChronicDisease(value => {
                  return {
                    ...value,
                    ...{
                      "Kidney Diseases": value["Kidney Diseases"] ? false : true
                    }
                  };
                })
              }
            />
            <Text style={[styles.labelText, { fontSize: 14, marginLeft: 10 }]}>
              {i18n.t("kidney")}
            </Text>
          </View>
          <View
            style={[
              styles.buttonFieldContainer,
              { justifyContent: "flex-start" }
            ]}
          >
            <CheckBox
              value={chronicDisease["Taking Steroids"] ? true : false}
              onValueChange={() =>
                setChronicDisease(value => {
                  return {
                    ...value,
                    ...{
                      "Taking Steroids": value["Taking Steroids"] ? false : true
                    }
                  };
                })
              }
            />
            <Text style={[styles.labelText, { fontSize: 14, marginLeft: 10 }]}>
              {i18n.t("steroids")}
            </Text>
          </View>
          <View
            style={[
              styles.buttonFieldContainer,
              { justifyContent: "flex-start" }
            ]}
          >
            <CheckBox
              value={chronicDisease.NO ? true : false}
              onValueChange={() =>
                setChronicDisease(value => {
                  return { ...value, ...{ NO: value.NO ? false : true } };
                })
              }
            />
            <Text style={[styles.labelText, { fontSize: 14, marginLeft: 10 }]}>
              {i18n.t("none")}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleNavigation}>
          <AntDesign name="rightcircle" color={theme.button} size={50} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {view === "LANGUAGE" ? null : (
        <View
          style={{
            position: "absolute",
            zIndex: 2,
            top: 0,
            width: width,
            marginLeft: width * 0.1,
            height: height * 0.2,
            marginTop: 60,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start"
          }}
        >
          <TouchableOpacity onPress={handleBackPress}>
            <AntDesign name="arrowleft" color={theme.button} size={24} />
          </TouchableOpacity>
        </View>
      )}
      {view === "AGE" && handleDateInput()}
      {view === "GENDER" && handleGenderInput()}
      {view === "NAME" && handleNameInput()}
      {view === "CARRIER" && handleInputCarrier()}
      {view === "CARRIER_SUSPECTED" && handleInputCarrierSuspected()}
      {view === "CHRONIC_DISEASE" && handleInputChronic()}
    </View>
  );
};

export default AuthScreen;
