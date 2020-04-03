import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated
} from "react-native";
import useTheme from "../../constants/theme";

const Card = props => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    root: {
      alignItems: "center"
    },
    card: {
      backgroundColor: theme.accent,
      width: Math.round(Dimensions.get("window").width * 0.9),
      height: Math.round(Dimensions.get("window").height * 0.55),
      alignItems: "center",
      justifyContent: "flex-start",
      borderRadius: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: theme.background,
      position: "relative",
      zIndex: 2,
      shadowColor: theme.shadowInvert,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,  
      elevation: 5
    },
    cardShadow: {
      width: Math.round(Dimensions.get("window").width * 0.8),
      height: Math.round(Dimensions.get("window").height * 0.565),
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      top: 0,
      zIndex: 1,
      borderRadius: 8,
      opacity: 0.8,
      backgroundColor: theme.shadow,
      shadowColor: theme.shadowInvert,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,  
      elevation: 5
    }
  });
  return (
    <View style={styles.root}>
      {props.shadow ? <View style={styles.cardShadow}></View> : null}
      <View style={styles.card}>
          {props.content}
      </View>
    </View>
  );
};

export default Card;
