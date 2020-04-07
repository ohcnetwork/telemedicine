import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import useTheme from "../../constants/theme";
import { AntDesign } from "@expo/vector-icons";

export const OutlinedButton = props => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    button: {
      backgroundColor: props.color ? props.color : theme.accent,
      alignItems: "center",
      justifyContent: "space-evenly",
      width: props.width
        ? props.width
        : Math.round(Dimensions.get("window").width * 0.3),
      height: props.height ? props.height : 40,
      borderRadius: 8,
      flexDirection: "row",
      borderColor: props.borderColor ? props.borderColor : theme.button,
      borderWidth: 1
    },
    text: {
      fontSize: props.fontSize ? props.fontSize : 15,
      color: props.textColor ? props.textColor : theme.text,
      fontWeight: "600"
    }
  });
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      {props.prefix ? (
        <AntDesign name={props.icon} size={15} color={theme.button} />
      ) : null}
      <Text style={styles.text}>{props.text}</Text>
      {props.suffix ? (
        <AntDesign name={props.icon} size={15} color={theme.button} />
      ) : null}
    </TouchableOpacity>
  );
};

export const ContainedButton = props => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    button: {
      backgroundColor: props.color ? props.color : theme.button,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: props.width
        ? props.width
        : Math.round(Dimensions.get("window").width * 0.3),
      height: props.height ? props.height : 40,
      borderRadius: 8,
      shadowColor: theme.shadowInvert,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      marginTop: props.mTop ? props.mTop : 0,
      marginLeft: props.mLeft ? props.mLeft : 0,
      marginRight: props.mRight ? props.mRight : 0,
      marginBottom: props.mBottom ? props.mBottom : 0,
      opacity: props.opacity? props.opacity : 1
    },
    text: {
      textAlign: 'center',
      fontSize: props.fontSize ? props.fontSize : 15,
      color: props.textColor ? props.textColor : theme.text,
      fontWeight: "600"
    }
  });

  return (
    <TouchableOpacity disabled={props.disabled} onPress={props.onPress} style={styles.button}>
      {props.prefix ? (
        <AntDesign name={props.icon} size={15} color={theme.white} />
      ) : null}
      <Text style={styles.text}>{props.text}</Text>
      {props.suffix ? (
        <AntDesign name={props.icon} size={15} color={theme.white} />
      ) : null}
    </TouchableOpacity>
  );
};
