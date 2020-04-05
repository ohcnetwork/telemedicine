import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Text,
  CheckBox,
} from "react-native";
import useTheme from "../constants/theme";
import at from "v-at";
import TextInput from "../components/input/Input";

import { executeData } from "../store/actions/ExecuteData";
import { AntDesign } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { ContainedButton } from "../components/button/Button";
import i18n from "i18n-js";

const AuthScreen = (props) => {
  let dispatch = useDispatch();
  const [asyncState, setAsyncState] = useState({});

  let saveAsync = useSelector((state) => {
    return state.AsyncStorageReducer;
  });
  let executeDataResponse = useSelector((state) => {
    return state.ExecuteData;
  });
  Promise.resolve(saveAsync).then((value) => {
    setAsyncState(value);
  });

  let theme = useTheme();
  let width = Math.round(Dimensions.get("window").width * 0.2);
  let height = Math.round(Dimensions.get("window").height * 0.7);
  const styles = StyleSheet.create({
    root: {
      backgroundColor: theme.accentDashboard,
      height: height,
      width: width,
      flex: 1,
      position: "relative",
    },
    inputContainer: {
      height: height,
      width: width,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    textContainer: {
      width: width,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      marginBottom: 20,
    },
    labelText: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text,
    },
    labelText2: {
      fontSize: 12,
      fontWeight: "500",
      color: theme.paragraph,
    },
    labelTextError: {
      fontSize: 12,
      fontWeight: "500",
      color: theme.error,
    },
    selectTextFieldContainer: {
      marginBottom: 20,
      borderBottomColor: theme.button,
      borderBottomWidth: 2,
      width: width * 0.8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    textFieldContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    OTPInput: {
      color: theme.text,
      fontSize: 18,
      fontWeight: "bold",
    },
    datePicker: {
      display: "flex",
      flexDirection: "row",
      width: width * 0.8,
      justifyContent: "space-evenly",
      alignItems: "center",
      paddingBottom: 5,
    },
    buttonFieldContainer: {
      width: width ,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    textFieldLocation: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      width: width,
      marginBottom: 20,
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
      padding: 8,
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
      padding: 8,
    },
  });

  const [view, setView] = useState("NAME");
  const [numberValue, setNumber] = useState(0);
  const [numberError, setNumberError] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
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
  const [agedRelative, setAgedRelative] = useState(false);
  const [contactCarrier, setContactCarrier] = useState(false);
  const [contactSuspectedCarrier, setContactSuspectedCarrier] = useState(false);
  const [chronicRelative, setChronicRelative] = useState(false);


  useEffect(() => {
    if (view === "DISTRICT") {
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
    } else if (view === "CHRONIC_DISEASE") {
      if (at(executeDataResponse, "UPDATE_USER_DATA.isDone")) {
        if (loader) {
         
            setLoader(false);
            if(at(executeDataResponse, 'UPDATE_USER_DATA.data')){
                let dataResponse = at(executeDataResponse, 'UPDATE_USER_DATA.data');
                if(!dataResponse.error) {
                    props.handlePatientCreate({
                        id: dataResponse.id,
                        parentId: dataResponse.phone_number
                    })
                }
               
            }
         
        } else {
          if (loader) {
            setLoader(false);
          }
        }
      }
    }
  });

  const handleNavigation = (value) => {
    switch (view) {
      case "NUMBER":
        if (numberValue) {
          setView("AGE");
        } else {
          setNumberError("Please Enter a Valid Mobile Number");
        }

        break;

      case "NAME":
        if (name) {
          setView("NUMBER");
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
          dispatch(
            executeData({
              type: "DISTRICT_LIST",
              method: "GET",
              cookies: true,
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
          district.forEach((item) => {
            if (item.id == districtValue) {
              districtName = item.name;
            }
          });

          dispatch(
            executeData({
              type: "LOCAL_BODY_LIST",
              method: "GET",
              cookies: true,
              req: {
                state: 1,
                state_name: "kerala",
                district: districtValue,
                districtName: districtName,
              },
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
          setView("PEOPLE");
        } else {
          return;
        }
        break;
      case "PEOPLE":
        setView("COUNTRY");
        break;
      case "COUNTRY":
        setView("CARRIER");
        break;
      case "CARRIER":
        setContactCarrier(value);
        setView("CARRIER_SUSPECTED");

        break;
      case "CARRIER_SUSPECTED":
        setContactSuspectedCarrier(value);
        setView("AGE_QUESTION");
        break;
      case "AGE_QUESTION":
        setAgedRelative(value);
        setView("RELATIVE_CHRONIC_DISEASE");
        break;
      case "RELATIVE_CHRONIC_DISEASE":
        setChronicRelative(value);
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
      let dataExecute = {};
      dataExecute.name = name;
      dataExecute.contact_with_confirmed_carrier = contactCarrier
      dataExecute.contact_with_suspected_carrier = contactSuspectedCarrier
      dataExecute.past_travel = countryBoolean
      dataExecute.has_SARI = false;
      dataExecute.age = age;
      dataExecute.gender =
        gender === "Male"
          ? 1
          : gender === "Female"
          ? 2
          : 3;
      dataExecute.phone_number = numberValue.slice(3);
      dataExecute.contact_with_carrier = contactCarrier;
      dataExecute.local_body = localityValue;
      dataExecute.district = districtValue;
      dataExecute.no_of_people = people;
      dataExecute.number_of_aged_dependents = agedRelative
        ? 1
        : 0;
      dataExecute.number_of_chronic_diseased_dependents = chronicRelative
        ? 1
        : 0;
      dataExecute.state = 1;
      dataExecute.primary = true;
      dataExecute.medical_history = chronicDisease;
      let local_body_object = {};
      let district_object = {};
      let state_object = {
        name: "Kerala",
      };
      dataExecute.state_object = state_object;

      locality.map((item) => {
        if (item.id == dataExecute.local_body) {
          local_body_object.name = item.name;
          local_body_object.body_type = item.body_type;
          local_body_object.localbody_code = item.localbody_code;
          local_body_object.district = item.district;
        }
      });
      dataExecute.local_body_object = local_body_object;
      district.map((item) => {
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
          token: at(asyncState, 'token'),
          method: "POST",
        })
      );
      
      setLoader(true);
  };

  const handleBackPress = () => {
    switch (view) {
      case "NUMBER":
        setView("NAME");
        break;
      case "AGE":
        setView("NUMBER");
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
          <Text style={styles.labelText}>{"Patients Name"}</Text>
        </View>
        <View style={styles.textFieldContainer}>
          <TextInput
            width={width}
            backgroundColor={theme.accentDashboard}
            borderColor={nameError ? theme.error : theme.button}
            onChange={(e) => {
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
          <Text style={styles.labelText}>{"Patient Travel History?"}</Text>
        </View>

        <View style={styles.buttonFieldContainer}>
          <ContainedButton
            text={i18n.t("yes")}
            width={width * 0.4}
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
            width={width * 0.4}
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
          <Text style={styles.labelText}>
            {"No of People Patient Live With?"}
          </Text>
        </View>
        <View style={styles.textFieldContainer}>
          <TextInput
            width={width}
            backgroundColor={theme.accentDashboard}
            onChange={(e) => {
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
          <Text style={styles.labelText}>{"Patients Address"}</Text>
        </View>
        <View style={styles.textFieldLocation}>
          <Text style={styles.labelText2}>{"Locality"}</Text>
          <View
            style={{
              ...styles.selectTextFieldContainer,
              ...{
                borderBottomColor: districtError ? theme.error : theme.button,
              },
            }}
          >
            <RNPickerSelect
              style={pickerSelectStyles}
              placeholder={placeholderDistrict}
              value={localityValue}
              onValueChange={(value) => {
                setLocalityError(false);
                if (value && value !== districtValue) {
                  selectedLocality(parseInt(value, 10));
                }
              }}
              items={
                !loader
                  ? locality.map((item) => {
                      return { label: item.name, value: item.id };
                    })
                  : []
              }
            />
          </View>
          <Text style={styles.labelText2}>{i18n.t("pincode")}</Text>
          <TextInput
           width={width * 0.8}
           backgroundColor={theme.accentDashboard}
            borderColor={
              !at(address, "postalCode") ? theme.error : theme.button
            }
            onChange={(e) => {
              setAddress((address) => {
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
          <Text style={styles.labelText}>{"Patients Age"}</Text>
        </View>
        <View style={styles.textFieldContainer}>
          <TextInput
            width={width}
            backgroundColor={theme.accentDashboard}
            borderColor={ageError ? theme.error : theme.button}
            onChange={(e) => {
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
          <Text style={styles.labelText}>{"Patients Gender"}</Text>
        </View>
        <View
          style={{
            ...styles.selectTextFieldContainer,
            ...{ borderBottomColor: genderError ? theme.error : theme.button },
          }}
        >
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={placeholderGender}
            value={gender}
            onValueChange={(value) => {
              setGenderError(false);
              selectedGender(value);
            }}
            items={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
              { label: "Other", value: "Other" },
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

  const placeholder = {
    label: "Select Language",
    value: null,
    color: theme.paragraph,
  };
  const placeholderGender = {
    label: "Select Gender",
    value: null,
    color: theme.paragraph,
  };

  const placeholderDistrict = {
    label: "Select District",
    value: null,
    color: theme.paragraph,
  };
  const handleNumberInput = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>{"Patients Mobile Number"}</Text>

          {numberError ? (
            <Text style={styles.labelTextError}>{numberError}</Text>
          ) : (
            <Text style={styles.labelText2}>
              {i18n.t("enter_number_valid")}
            </Text>
          )}
        </View>
        <View style={styles.textFieldContainer}>
          <TextInput
            autoCompleteType="tel"
            maxLength={13}
            width={width}
            backgroundColor={theme.accentDashboard}
            defaultValue="+91"
            onChange={(e) => {
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

 

  const handleDistrictInput = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>{"Patients District"}</Text>
        </View>
        <View
          style={{
            ...styles.selectTextFieldContainer,
            ...{
              borderBottomColor: districtError ? theme.error : theme.button,
            },
          }}
        >
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={placeholderDistrict}
            value={districtValue}
            onValueChange={(value) => {
              setDistrictError(false);
              if (value && value !== districtValue) {
                selectedDistrict(parseInt(value, 10));
              }
            }}
            items={district.map((item) => {
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
          <Text style={styles.labelText}>
            {"Did Patient Came To Contact With Carrier?"}
          </Text>
        </View>

        <View style={styles.buttonFieldContainer}>
          <ContainedButton
            text={i18n.t("yes")}
            width={width * 0.4}
            color={theme.success}
            textColor={theme.white}
            onPress={() => {
              handleNavigation(true);
            }}
          />
          <ContainedButton
            text={i18n.t("no")}
            width={width * 0.4}
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
            {"Did Patient Came To Contact With Suspected Carrier?"}
          </Text>
        </View>

        <View style={styles.buttonFieldContainer}>
          <ContainedButton
            text={i18n.t("yes")}
            width={width * 0.4}
            color={theme.success}
            textColor={theme.white}
            onPress={() => {
              handleNavigation(true);
            }}
          />
          <ContainedButton
            text={i18n.t("no")}
            width={width * 0.4}
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
          <Text style={styles.labelText}>{"Aged Dependents of Patient?"}</Text>
        </View>

        <View style={styles.buttonFieldContainer}>
          <ContainedButton
            text={i18n.t("yes")}
            width={width * 0.4}
            color={theme.success}
            textColor={theme.white}
            onPress={() => {
              handleNavigation(true);
            }}
          />
          <ContainedButton
            text={i18n.t("no")}
            width={width * 0.4}
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
          <Text style={styles.labelText}>
            {"Any Relatives with Chronic Disease"}
          </Text>
        </View>

        <View style={styles.buttonFieldContainer}>
          <ContainedButton
            text={i18n.t("yes")}
            width={width * 0.4}
            color={theme.success}
            textColor={theme.white}
            onPress={() => {
              handleNavigation(true);
            }}
          />
          <ContainedButton
            text={i18n.t("no")}
            width={width * 0.4}
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
          <Text style={styles.labelText}>
            {"Patient Has Any Chronic Disease?"}
          </Text>
          <Text style={styles.labelText2}>
            {i18n.t("previous_disease_hint")}
          </Text>
        </View>

        <View style={[styles.textContainer, { marginTop: 20 }]}>
          <View
            style={[
              styles.buttonFieldContainer,
              { justifyContent: "flex-start" },
            ]}
          >
            <CheckBox
              value={chronicDisease.Diabetes ? true : false}
              onValueChange={() =>
                setChronicDisease((value) => {
                  return {
                    ...value,
                    ...{ Diabetes: value.Diabetes ? false : true },
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
              { justifyContent: "flex-start" },
            ]}
          >
            <CheckBox
              value={chronicDisease["Heart Disease"] ? true : false}
              onValueChange={() =>
                setChronicDisease((value) => {
                  return {
                    ...value,
                    ...{
                      "Heart Disease": value["Heart Disease"] ? false : true,
                    },
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
              { justifyContent: "flex-start" },
            ]}
          >
            <CheckBox
              value={chronicDisease.HyperTension ? true : false}
              onValueChange={() =>
                setChronicDisease((value) => {
                  return {
                    ...value,
                    ...{ HyperTension: value.HyperTension ? false : true },
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
              { justifyContent: "flex-start" },
            ]}
          >
            <CheckBox
              value={chronicDisease["Lung Diseases/Asthma"] ? true : false}
              onValueChange={() =>
                setChronicDisease((value) => {
                  return {
                    ...value,
                    ...{
                      "Lung Diseases/Asthma": value["Lung Diseases/Asthma"]
                        ? false
                        : true,
                    },
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
              { justifyContent: "flex-start" },
            ]}
          >
            <CheckBox
              value={chronicDisease.Cancer ? true : false}
              onValueChange={() =>
                setChronicDisease((value) => {
                  return {
                    ...value,
                    ...{ Cancer: value.Cancer ? false : true },
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
              { justifyContent: "flex-start" },
            ]}
          >
            <CheckBox
              value={chronicDisease["Kidney Diseases"] ? true : false}
              onValueChange={() =>
                setChronicDisease((value) => {
                  return {
                    ...value,
                    ...{
                      "Kidney Diseases": value["Kidney Diseases"]
                        ? false
                        : true,
                    },
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
              { justifyContent: "flex-start" },
            ]}
          >
            <CheckBox
              value={chronicDisease["Taking Steroids"] ? true : false}
              onValueChange={() =>
                setChronicDisease((value) => {
                  return {
                    ...value,
                    ...{
                      "Taking Steroids": value["Taking Steroids"]
                        ? false
                        : true,
                    },
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
              { justifyContent: "flex-start" },
            ]}
          >
            <CheckBox
              value={chronicDisease.NO ? true : false}
              onValueChange={() =>
                setChronicDisease((value) => {
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
            justifyContent: "center",
          }}
          animating={loader}
          color={theme.button}
        />
      )}
      {view === "NAME" ? null : (
        <View
          style={{
            position: "absolute",
            zIndex: 2,
            top: 0,
            width: width,
            marginTop: 20,
            height: height * 0.15,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <TouchableOpacity onPress={handleBackPress}>
            <AntDesign name="arrowleft" color={theme.button} size={24} />
          </TouchableOpacity>
        </View>
      )}
      {view === "NUMBER" && handleNumberInput()}
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
