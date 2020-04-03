import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  AsyncStorage,
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
    }
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
          handleRiskScreenNav();
        } else {
          setGenderError(true);
        }
        break;
      default:
        break;
    }
  };

  const handleRiskScreenNav = () => {
    let data = { ...asyncState };
    if (data) {
      dispatch(
        executeData({
          req: JSON.stringify({
            fullname: name,
            sex: gender,
            age: age,
            primary: false
          }),
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
    </View>
  );
};

export default AuthScreen;
