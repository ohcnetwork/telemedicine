import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Text,
  CheckBox
} from "react-native";
import useTheme from "../constants/theme";
import at from "v-at";
import TextInput from "../components/input/Input";
import {
  saveToStoreLanguage,
  saveToStore,
  saveToStoreToken,
  saveToStoreTokenAndData
} from "../store/actions/SaveAsync";
import { executeData, clearData } from "../store/actions/ExecuteData";
import { AntDesign } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import OTPTextView from "react-native-otp-textinput";
import { ContainedButton, OutlinedButton } from "../components/button/Button";
import { useLanguage } from "../constants/language/LanguageHook";
import i18n from "i18n-js";
import * as Device from "expo-device";

// import DateTimePicker from "@react-native-community/datetimepicker";
// import moment from "moment";
async function getDevice() {
  let device = 0;
  device = await Device.getDeviceTypeAsync();
  return device;
}
const AuthScreen = ({ navigation, props }) => {
  let dispatch = useDispatch();
  const [language, setNewLanguage] = useLanguage();
  const [asyncState, setAsyncState] = useState({});
  const [desktop, setDesktop] = useState(false);

  let saveAsync = useSelector(state => {
    return state.AsyncStorageReducer;
  });
  let executeDataResponse = useSelector(state => {
    return state.ExecuteData;
  });
  Promise.resolve(saveAsync).then(value => {
    setAsyncState(value);
  });
  const device = getDevice();
  Promise.resolve(device).then(deviceName => {
    let devices = Device.DeviceType;
    if (deviceName in devices) {
      if (devices[deviceName] === "DESKTOP") {
        setDesktop(true);
        setView("EMAIL");
      }
    }
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
    OTPInput: {
      color: theme.text,
      fontSize: 18,
      fontWeight: "bold"
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
    textFieldLocation: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      width: width * 0.8,
      marginBottom: 20
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

  // const checkToken = async () => {
  //   let storage = await AsyncStorage.getItem("@storage");

  //   storage = JSON.parse(storage);
  //   if (storage && storage.token && storage.metaData.primary) {
  //     navigation.navigate("home");
  //   }
  // };
  // useEffect(() => {
  //   checkToken();
  // });

  const [view, setView] = useState("LANGUAGE");
  const [languageValue, selectedLanguage] = useState("en");
  const [numberValue, setNumber] = useState(0);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [numberError, setNumberError] = useState(null);
  const [OTP, setOTP] = useState(null);
  const [OTPError, setOTPError] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [district, setDistrict] = useState([]);
  const [districtValue, selectedDistrict] = useState(0);
  const [genderError, setGenderError] = useState(false);
  const [address, setAddress] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, selectedGender] = useState(null);
  const [countryBoolean, setCountryBoolean] = useState(false);
  const [chronicDisease, setChronicDisease] = useState({});
  const [name, setName] = useState(null);
  const [people, setPeople] = useState(0);
  const [loader, setLoader] = useState(false);
  const [districtError, setDistrictError] = useState(false);
  const [localityError, setLocalityError] = useState(false);
  const [locality, setLocality] = useState([]);
  const [localityValue, selectedLocality] = useState(0);

  useEffect(() => {
    if (view === "OTP") {
      if (at(executeDataResponse, "SEND_OTP_CHECK.isDone")) {
        if (at(executeDataResponse, "SEND_OTP_CHECK.data.access_token")) {
          if (at(executeDataResponse, "SEND_OTP_CHECK.data.role") === "USER") {
            if (at(executeDataResponse, "SEND_OTP_CHECK.data.userInfo")) {
              handleUserInitialize();
              navigation.navigate("home");
            } else {
              handleTokenInitialize();
              setView("NAME");
            }
          }
        } else {
          setOTPError("Invalid OTP");
        }
      }
    } else if (view === "DISTRICT") {
      if (at(executeDataResponse, "DISTRICT_LIST.isDone")) {
        if (!(district.length > 0)) {
          setDistrict(at(executeDataResponse, "DISTRICT_LIST.data"));
          setLoader(false);
        } else {
          if (loader) {
            setLoader(false);
          }
        }
      }
    } else if (view === "ADDRESS") {
      if (at(executeDataResponse, "LOCAL_BODY_LIST.isDone")) {
        if (!(locality.length > 0)) {
          setLocality(at(executeDataResponse, "LOCAL_BODY_LIST.data.results"));
          setLoader(false);
        } else {
          if (loader) {
            setLoader(false);
          }
        }
      }
    } else if (view === "EMAIL") {

      if (at(executeDataResponse, "EMAIL_LOGIN.isDone")) {
        setLoader(false);
        if ((!asyncState, "token")) {
          if (at(executeDataResponse, "EMAIL_LOGIN.data.token")) {
            dispatch(
              saveToStoreTokenAndData({
                token: at(executeDataResponse, "EMAIL_LOGIN.data.token"),
                metaData: {
                  ...at(executeDataResponse, "EMAIL_LOGIN.data.userInfo.0"),
                  ROLE: at(executeDataResponse, "EMAIL_LOGIN.data.ROLE")
                }
              })
            );
            navigation.navigate("dashboard");
          }  else if(at(executeDataResponse, "EMAIL_LOGIN.data.error")) {
            setEmailError(true);
            dispatch(clearData({
              type: 'EMAIL_LOGIN'
            }))
          }
        }
      }
    } else if (view === "CHRONIC_DISEASE") {
      if (at(executeDataResponse, "UPDATE_USER_DATA.isDone")) {
        if (loader) {
          if (JSON.parse(at(executeDataResponse, "UPDATE_USER_DATA.data")).id) {
            dispatch(
              saveToStore({
                metaData: {
                  primary: true,
                  id: JSON.parse(
                    at(executeDataResponse, "UPDATE_USER_DATA.data")
                  ).id
                }
              })
            );
          }

          if (at(asyncState, "metaData.primary")) {
            setLoader(false);
            navigation.navigate("home");
          }
        } else {
          if (loader) {
            setLoader(false);
          }
        }
      }
    }
  });

  const handleTokenInitialize = () => {
    dispatch(
      saveToStoreToken({
        token: at(executeDataResponse, "SEND_OTP_CHECK.data.access_token")
      })
    );
  };
  const handleUserInitialize = () => {
    dispatch(
      saveToStoreTokenAndData({
        metaData: {
          primary: true,
          ...JSON.parse(
            at(executeDataResponse, "SEND_OTP_CHECK.data.userInfo")
          ),
          activeUser: at(asyncState, "metaData.name"),
          name: at(
            executeDataResponse,
            "SEND_OTP_CHECK.data.userInfo.name"
          )
        },
        token: at(executeDataResponse, "SEND_OTP_CHECK.data.access_token")
      })
    );
  };

  const handleNavigation = value => {
    switch (view) {
      case "LANGUAGE":
        setNewLanguage({ language: languageValue });
        i18n.locale = languageValue;
        dispatch(saveToStoreLanguage({ language: languageValue }));
        if (desktop) {
          setView("EMAIL");
        } else {
          setView("NUMBER");
        }
        break;
      case "EMAIL":
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(re.test(email), email, password);
        if (email) {
          if (!re.test(email) || !password) {
            setEmailError(i18n.t("enter_email_valid"));
            return;
          }
          dispatch(
            executeData({
              method: "POST",
              type: "EMAIL_LOGIN",
              req: JSON.stringify({
                email: email,
                password: password
              })
            })
          );
          setLoader(true);
          dispatch(saveToStore({ metaData: { email: email } }));
        } else {
          setEmailError(i18n.t("enter_email_valid"));
        }

        break;
      case "NUMBER":
        let reg = new RegExp("^[0-9]{12}$");
        if (numberValue) {
          let numberCheck = numberValue.slice(1);
          let number = numberValue.slice(3);
          if (!reg.test(numberCheck) || numberValue[0] !== "+") {
            setNumberError(i18n.t("enter_number_valid"));
            return;
          }
          dispatch(
            executeData({
              method: "GET",
              type: "SEND_PHONE_NUMBER",
              req: {
                phone: number
              }
            })
          );
          dispatch(saveToStore({ metaData: { phoneNumber: numberValue } }));

          setView("OTP");
        } else {
          setNumberError("Please Enter a Valid Mobile Number");
        }

        break;
      case "OTP":
        if (OTP) {
          let reg = new RegExp("^[0-9]{4}$");
          if (!reg.test(OTP)) {
            setOTPError("Please Enter  Valid OTP");
            return;
          }
          dispatch(
            executeData({
              method: "GET",
              type: "SEND_OTP_CHECK",
              req: {
                otp: OTP,
                number: numberValue.slice(3)
              }
            })
          );
          // dispatch(saveToStore({ metaData: { phoneNumber: numberValue } }));
        } else {
          setOTPError("Please Enter Valid OTP");
        }

        break;
      case "NAME":
        if (name) {
          dispatch(saveToStore({ metaData: { name: name } }));
          setView("AGE");
        } else {
          setNameError(true);
        }
        break;
      case "AGE":
        if (age) {
          dispatch(saveToStore({ metaData: { age: age } }));
          setView("GENDER");
        } else {
          setAgeError(true);
        }
        break;
      case "GENDER":
        if (gender) {
          dispatch(saveToStore({ metaData: { gender: gender } }));
          dispatch(
            executeData({
              type: "DISTRICT_LIST",
              method: "GET",
              cookies: true
            })
          );
          setLoader(true);
          setView("DISTRICT");
        } else {
          setGenderError(true);
        }
        break;
      case "DISTRICT":
        if (gender) {
          let districtName = null;
          district.forEach(item => {
            if (item.id == districtValue) {
              districtName = item.name;
            }
          });
          dispatch(
            saveToStore({
              metaData: { district: districtValue, districtName: districtName }
            })
          );

          dispatch(
            executeData({
              type: "LOCAL_BODY_LIST",
              method: "GET",
              cookies: true,
              req: {
                state: 1,
                state_name: "kerala",
                district: districtValue,
                districtName: districtName
              }
            })
          );
          setLoader(true);
          setView("ADDRESS");
        } else {
          setGenderError(true);
        }
        break;
      case "ADDRESS":
        if (at(address, "postalCode")) {
          dispatch(saveToStore({ metaData: { local_body: localityValue } }));
          setView("PEOPLE");
        } else {
          return;
        }
        break;
      case "PEOPLE":
        if (people) {
          dispatch(saveToStore({ metaData: { no_of_people: people } }));
        }
        setView("COUNTRY");
        break;
      case "COUNTRY":
        dispatch(saveToStore({ metaData: { past_travel: countryBoolean } }));
        setView("CARRIER");
        break;
      case "CARRIER":
        dispatch(
          saveToStore({
            metaData: { contact_with_confirmed_carrier: value }
          })
        );
        setView("CARRIER_SUSPECTED");

        break;
      case "CARRIER_SUSPECTED":
        dispatch(
          saveToStore({
            metaData: { contact_with_suspected_carrier: value }
          })
        );
        setView("AGE_QUESTION");
        break;
      case "AGE_QUESTION":
        dispatch(
          saveToStore({ metaData: { number_of_aged_dependents: value } })
        );
        setView("RELATIVE_CHRONIC_DISEASE");
        break;
      case "RELATIVE_CHRONIC_DISEASE":
        dispatch(
          saveToStore({
            metaData: { number_of_chronic_diseased_dependents: value }
          })
        );
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
      dataExecute.name = data.metaData.name;
      dataExecute.contact_with_confirmed_carrier =
        data.metaData.contact_with_confirmed_carrier;
      dataExecute.contact_with_suspected_carrier =
        data.metaData.contact_with_suspected_carrier;
      dataExecute.past_travel = data.metaData.past_travel;
      dataExecute.has_SARI = false;
      dataExecute.age = data.metaData.age;
      dataExecute.gender =
        data.metaData.gender === "Male"
          ? 1
          : data.metaData.gender === "Female"
          ? 2
          : 3;
      dataExecute.phone_number = data.metaData.phoneNumber;
      dataExecute.contact_with_carrier =
        data.metaData.contact_with_confirmed_carrier;
      dataExecute.local_body = data.metaData.local_body;
      dataExecute.district = data.metaData.district;
      dataExecute.no_of_people = data.metaData.no_of_people;
      dataExecute.number_of_aged_dependents = data.metaData
        .number_of_aged_dependents
        ? 1
        : 0;
      dataExecute.number_of_chronic_diseased_dependents = data.metaData
        .number_of_chronic_diseased_dependents
        ? 1
        : 0;
      dataExecute.state = 1;
      dataExecute.primary = true;
      dataExecute.medical_history = chronicDisease;
      let local_body_object = {};
      let district_object = {};
      let state_object = {
        name: "Kerala"
      };
      dataExecute.state_object = state_object;

      locality.map(item => {
        if (item.id == dataExecute.local_body) {
          local_body_object.name = item.name;
          local_body_object.body_type = item.body_type;
          local_body_object.localbody_code = item.localbody_code;
          local_body_object.district = item.district;
        }
      });
      dataExecute.local_body_object = local_body_object;
      district.map(item => {
        if (item.id == dataExecute.district) {
          district_object.name = item.name;
          district_object.state = item.state;
        }
      });
      dataExecute.district_object = district_object;
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
            local_body_object: local_body_object,
            district_object: district_object
          }
        })
      );
      setLoader(true);
      // dispatch(
      //   saveToStore({
      //     metaData: {
      //       primary: true
      //     }
      //   })
      // );
    }
  };

  const handleBackPress = () => {
    switch (view) {
      case "NUMBER":
        setView("LANGUAGE");
        break;
      case "OTP":
        setView("NUMBER");
        break;
      case "NAME":
        setView("NUMBER");
        break;
      case "AGE":
        setView("NAME");
        break;
      case "GENDER":
        setView("AGE");
        break;
      case "DISTRICT":
        setView("GENDER");
        break;
      case "ADDRESS":
        setView("DISTRICT");
        break;
      case "PEOPLE":
        setView("ADDRESS");
        break;
      case "COUNTRY":
        setView("PEOPLE");
        break;
      case "CARRIER":
        setView("COUNTRY");
        break;
      case "CARRIER_SUSPECTED":
        setView("CARRIER");
        break;
      case "AGE_QUESTION":
        setView("CARRIER_SUSPECTED");
        break;
      case "RELATIVE_CHRONIC_DISEASE":
        setView("AGE_QUESTION");
        break;
      case "CHRONIC_DISEASE":
        setView("RELATIVE_CHRONIC_DISEASE");
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

  // const handleCountryYes = value => {
  //   if (value === "YES") {
  //     setCountryBoolean(true);

  //   }
  //   if (value === "NO") {
  //     handleRiskScreenNav();
  //   }
  // };

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
  const handleCountryInput = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>{i18n.t("travel_history")}</Text>
        </View>

        <View style={styles.buttonFieldContainer}>
          <ContainedButton
            text={i18n.t("yes")}
            color={theme.success}
            textColor={theme.white}
            onPress={() => {
              handleNavigation();
              setCountryBoolean(true);
            }}
          />
          <ContainedButton
            text={i18n.t("no")}
            color={theme.button}
            textColor={theme.white}
            onPress={() => {
              handleNavigation();
              setCountryBoolean(false);
            }}
          />
        </View>
      </View>
    );
  };

  const handlePeopleInput = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>{i18n.t("people_live_with")}</Text>
        </View>
        <View style={styles.textFieldContainer}>
          <TextInput
            onChange={e => {
              setPeople(e);
            }}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity onPress={handleNavigation}>
          <AntDesign name={"rightcircle"} color={theme.button} size={50} />
        </TouchableOpacity>
      </View>
    );
  };

  const handleAddressInput = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>{i18n.t("enter_address")}</Text>
        </View>
        <View style={styles.textFieldLocation}>
          <Text style={styles.labelText2}>{i18n.t("locality")}</Text>
          <View
            style={{
              ...styles.selectTextFieldContainer,
              ...{
                borderBottomColor: districtError ? theme.error : theme.button
              }
            }}
          >
            <RNPickerSelect
              style={pickerSelectStyles}
              placeholder={placeholderDistrict}
              value={localityValue}
              onValueChange={value => {
                setLocalityError(false);
                if (value && value !== districtValue) {
                  selectedLocality(parseInt(value, 10));
                }
              }}
              items={
                !loader
                  ? locality.map(item => {
                      return { label: item.name, value: item.id };
                    })
                  : []
              }
            />
          </View>
          <Text style={styles.labelText2}>{i18n.t("pincode")}</Text>
          <TextInput
            borderColor={
              !at(address, "postalCode") ? theme.error : theme.button
            }
            onChange={e => {
              setAddress(address => {
                return { ...address, ...{ postalCode: e } };
              });
            }}
            defaultValue={
              at(address, "postalCode") ? at(address, "postalCode") : null
            }
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity onPress={handleNavigation}>
          <AntDesign
            name={
              !at(address, "postalCode") ? "exclamationcircle" : "rightcircle"
            }
            color={!at(address, "postalCode") ? theme.error : theme.button}
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
  const handleOTPInput = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>{i18n.t("otp_header")}</Text>
          <Text style={OTPError ? styles.labelTextError : styles.labelText2}>
            {i18n.t(OTPError ? "otp_error" : "otp_label")}
          </Text>
          <Text style={styles.labelText2}>{numberValue}</Text>
        </View>
        <View style={styles.textFieldContainer}>
          <OTPTextView
            tintColor={OTPError ? theme.error : theme.active}
            offTintColor={OTPError ? theme.error : theme.active}
            textInputStyle={styles.OTPInput}
            handleTextChange={text => {
              setOTPError(null);
              setOTP(text);
            }}
            inputCount={4}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity onPress={handleNavigation}>
          <AntDesign
            name={OTPError ? "exclamationcircle" : "rightcircle"}
            color={OTPError ? theme.error : theme.button}
            size={50}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const placeholder = {
    label: "Select Language",
    value: null,
    color: theme.paragraph
  };
  const placeholderGender = {
    label: "Select Gender",
    value: null,
    color: theme.paragraph
  };

  const placeholderDistrict = {
    label: "Select District",
    value: null,
    color: theme.paragraph
  };

  const handleNumberInput = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>{i18n.t("enter_number")}</Text>

          {numberError ? (
            <Text style={styles.labelTextError}>{numberError}</Text>
          ) : (
            <Text style={styles.labelText2}>
              {i18n.t("enter_number_valid")}
            </Text>
          )}
        </View>
        <View style={styles.textFieldContainer}>
          <AntDesign name="mobile1" color={theme.button} size={30} />

          <TextInput
            autoCompleteType="tel"
            maxLength={13}
            defaultValue="+91"
            onChange={e => {
              setNumber(e);
              setNumberError(null);
            }}
            keyboardType="phone-pad"
          />
        </View>
        <TouchableOpacity onPress={handleNavigation}>
          <AntDesign
            name={numberError ? "exclamationcircle" : "rightcircle"}
            color={numberError ? theme.error : theme.button}
            size={50}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const handleLanguageInput = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>
            Please Select Your Preferred Language...
          </Text>
        </View>
        <View style={styles.selectTextFieldContainer}>
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={placeholder}
            value={languageValue}
            onValueChange={value => {
              selectedLanguage(value);
            }}
            items={[
              { label: "മലയാളം", value: "ml" },
              { label: "English", value: "en" }
            ]}
          />
        </View>
        <TouchableOpacity onPress={handleNavigation}>
          <AntDesign name="rightcircle" color={theme.button} size={50} />
        </TouchableOpacity>
      </View>
    );
  };
  const handleChooseScreen = () => {
    return (
      <View style={styles.inputContainer}>
        <ContainedButton
          mBottom={20}
          onPress={() => setView("NUMBER")}
          textColor={theme.white}
          width={desktop ? width * 0.4 : width * 0.8}
          text="Login with Phone Number"
        />
        <OutlinedButton
          color={theme.background}
          onPress={() => setView("EMAIL")}
          textColor={theme.button}
          width={desktop ? width * 0.4 : width * 0.8}
          text="Login with Email"
        />
      </View>
    );
  };
  const handleEmailScreen = () => {
    return (
      <View style={styles.inputContainer}>
        {emailError ? (
          <Text style={styles.labelTextError}>
            {"Invalid Email or Password! Try Again"}
          </Text>
        ) : null}

        <View style={styles.textContainer}>
          <Text style={styles.labelText}>{i18n.t("enter_email")}</Text>
        </View>
        <View style={styles.textFieldContainer}>
          <TextInput
            autoCompleteType="email"
            keyboardType="email-address"
            borderColor={emailError ? theme.error : theme.button}
            onChange={e => {
              setEmailError(false);
              setEmail(e);
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>{i18n.t("enter_password")}</Text>
        </View>
        <View style={styles.textFieldContainer}>
          <TextInput
            secureTextEntry={true}
            textContentType="password"
            autoCompleteType="password"
            borderColor={emailError ? theme.error : theme.button}
            onChange={e => {
              setEmailError(false);
              setPassword(e);
            }}
          />
        </View>
        <TouchableOpacity onPress={handleNavigation}>
          <AntDesign
            name={emailError ? "exclamationcircle" : "rightcircle"}
            color={emailError ? theme.error : theme.button}
            size={50}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const handleDistrictInput = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>{i18n.t("enter_district")}</Text>
        </View>
        <View
          style={{
            ...styles.selectTextFieldContainer,
            ...{ borderBottomColor: districtError ? theme.error : theme.button }
          }}
        >
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={placeholderDistrict}
            value={districtValue}
            onValueChange={value => {
              setDistrictError(false);
              if (value && value !== districtValue) {
                selectedDistrict(parseInt(value, 10));
              }
            }}
            items={district.map(item => {
              return { label: item.name, value: item.id };
            })}
          />
        </View>
        <TouchableOpacity onPress={handleNavigation}>
          <AntDesign
            name={districtError ? "exclamationcircle" : "rightcircle"}
            color={districtError ? theme.error : theme.button}
            size={50}
          />
        </TouchableOpacity>
      </View>
    );
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
  const handleInputAged = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>{i18n.t("aged_question")}</Text>
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
  const handleInputRelativeChronic = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>{i18n.t("relative_chronic")}</Text>
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
      {loader && (
        <ActivityIndicator
          size="large"
          style={{
            position: "absolute",
            zIndex: 20,
            width: width,
            height: height,
            alignItems: "center",
            justifyContent: "center"
          }}
          animating={loader}
          color={theme.button}
        />
      )}
      {view === "LANGUAGE" || view === "EMAIL" ? null : (
        <View
          style={{
            position: "absolute",
            zIndex: 2,
            top: 0,
            width: width,
            marginLeft: width * 0.1,
            height: height * 0.15,
            marginTop: 20,
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
      {view === "CHOOSE" && handleChooseScreen()}
      {view === "EMAIL" && handleEmailScreen()}
      {view === "LANGUAGE" && handleLanguageInput()}
      {view === "NUMBER" && handleNumberInput()}
      {view === "OTP" && handleOTPInput()}
      {view === "AGE" && handleDateInput()}
      {view === "GENDER" && handleGenderInput()}
      {view === "DISTRICT" && handleDistrictInput()}
      {view === "NAME" && handleNameInput()}
      {view === "PEOPLE" && handlePeopleInput()}
      {view === "COUNTRY" && handleCountryInput()}
      {view === "ADDRESS" && handleAddressInput()}
      {view === "CARRIER" && handleInputCarrier()}
      {view === "CARRIER_SUSPECTED" && handleInputCarrierSuspected()}
      {view === "AGE_QUESTION" && handleInputAged()}
      {view === "RELATIVE_CHRONIC_DISEASE" && handleInputRelativeChronic()}
      {view === "CHRONIC_DISEASE" && handleInputChronic()}
    </View>
  );
};

export default AuthScreen;
