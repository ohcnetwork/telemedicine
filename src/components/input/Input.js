import React from "react";
import { TextInput, StyleSheet, Dimensions } from "react-native";
import useTheme from "../../constants/theme";

const Input = props => {
  let theme = useTheme();
  let width = Math.round(Dimensions.get("window").width);
  let height = Math.round(Dimensions.get("window").height);
  const styles = StyleSheet.create({
    textInput: {
      width: props.width ? props.width : width * 0.8,
      height: props.height ? props.height : 50,
      backgroundColor: theme.background,
      color: theme.text,
      fontSize: props.size ? props.size : 18,
      borderBottomWidth: 2,
      padding: 8,
      marginHorizontal: props.marginHorizontal? props.marginHorizontal : 0,
      borderBottomColor: props.borderColor ? props.borderColor : theme.button
    }
  });
  return (
    <TextInput
    secureTextEntry={props.secureTextEntry ? props.secureTextEntry : false}
      allowFontScaling
      textContentType={props.textContentType ? props.textContentType : 'none'}
      autoCompleteType={props.autoCompleteType ? props.autoCompleteType : 'off'}
      placeholder={props.placeholder}
      // enabled={props.enabled ? props.enabled : true}
      caretHidden={props.caretHidden ? props.caretHidden : false}
      defaultValue={props.defaultValue ? props.defaultValue : null}
      placeholderTextColor={theme.paragraph}
      multiline={ props.multiline ? props.multiline : false}
      onChangeText={props.onChange}
      numberOfLines={props.numberOfLines ? props.numberOfLines: 1}
      maxLength={ props.maxLength ? props.maxLength : 200}
      keyboardType={props.keyboardType ? props.keyboardType : 'default'}
      inlineImagePadding={
        props.inlineImagePadding ? props.inlineImagePadding : 0
      }
      inlineImageLeft={props.inlineImageLeft ? props.inlineImageLeft : null}
      autoFocus={props.autoFocus ? props.autoFocus : true}
      style={styles.textInput}
    />
  );
};

export default Input;
