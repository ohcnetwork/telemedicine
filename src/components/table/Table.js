import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import useTheme from "../../constants/theme";
import moment from "moment";
import { ContainedButton } from "../button/Button";
import { AntDesign } from "@expo/vector-icons";
import at from "v-at";

const Table = (props) => {
  const header = ["patient", "created_at", "priority", "status", "actions"];

  if (props.doctor) {
    header.splice(4, 0, "volunteer_name");
  }

  let theme = useTheme();
  let width = Math.round(Dimensions.get("window").width);
  let height = Math.round(Dimensions.get("window").height);
  const styles = StyleSheet.create({
    table: {
      width: props.width ? props.width : width * 0.8,
      padding: 30,
      height: height * 0.75,
      backgroundColor: theme.accent,
    },
    header: {
      height: 40,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      padding: 5,
    },
    rows: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      width: props.width
        ? Math.round(props.width - 60)
        : Math.round(width * 0.8 - 60),
      height: 60,
      borderBottomColor: theme.shadow,
      borderBottomWidth: 1,
      padding: 5,
    },
    headerBlock: {
      width: props.width ? Math.round((props.width - 60) / header.length) : 200,
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 1,
      height: 40,
      borderBottomColor: theme.shadow,
    },
    headerText: {
      color: theme.paragraph,
      fontSize: 12,
      fontWeight: "600",
      textTransform: "capitalize",
    },
    rowBlock: {
      width: props.width ? Math.round((props.width - 60) / header.length) : 200,
      alignItems: "center",
      justifyContent: "center",
      height: 60,
    },
    patientBlock: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    patientName: {
      color: theme.text,
      fontSize: 13,
      fontWeight: "bold",
    },
    patientPhone: {
      color: theme.paragraph,
      fontSize: 12,
      fontWeight: "bold",
    },
    commonText: {
      color: theme.text,
      fontSize: 11,
      fontWeight: "600",
    },
    chip: {
      width: props.width
        ? Math.round((props.width - 60) / header.length - 60)
        : 200,
      height: 20,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.button,
    },
    chipText: {
      color: theme.white,
      fontSize: 12,
      fontWeight: "bold",
      textTransform: "uppercase",
    },
  });

  const handleRowPress = (id, row) => {
    props.handleRowView(id, row);
  };
  return (
    <View style={styles.table}>
      <View style={styles.header}>
        {header.map((item, idx) => {
          return (
            <View
              key={idx}
              style={
                item === "patient"
                  ? [styles.headerBlock, { alignItems: "flex-start" }]
                  : [styles.headerBlock]
              }
            >
              <Text style={styles.headerText}>
                {item === "created_at" ? "Time" : item.replace(/_/g, " ")}
              </Text>
            </View>
          );
        })}
      </View>
      {props.rows.map((row, id) => {
        return (
          <TouchableOpacity
            onPress={() => handleRowPress(id, row)}
            key={id}
            style={[
              styles.rows,
              {
                backgroundColor:
                  props.active === id ? theme.dashboard : theme.accent,
              },
            ]}
          >
            {header.map((item, idx) => {
              if (item === "patient") {
                return (
                  <View
                    key={idx}
                    style={[styles.rowBlock, { alignItems: "flex-start" }]}
                  >
                    <View style={styles.patientBlock}>
                      <Text
                        style={[
                          styles.patientName,
                          { textTransform: "capitalize" },
                        ]}
                      >
                        {row[item].name}
                      </Text>
                      <Text style={styles.patientPhone}>{row[item].phone}</Text>
                    </View>
                  </View>
                );
              } else if (item === "created_at") {
                return (
                  <View key={idx} style={[styles.rowBlock]}>
                    <Text style={styles.commonText}>
                      {moment(row[item]).startOf("hour").fromNow()}
                    </Text>
                  </View>
                );
              } else if (item === "priority") {
                if (row[item] === "HIGH") {
                  return (
                    <View key={idx} style={[styles.rowBlock]}>
                      {/* <View style={[styles.chip, {backgroundColor: theme.error}]}> */}
                      <Text style={[styles.chipText, { color: theme.error }]}>
                        {row[item]}
                      </Text>
                      {/* </View> */}
                    </View>
                  );
                } else {
                  return (
                    <View key={idx} style={[styles.rowBlock]}>
                      {/* <View style={[styles.chip]}> */}
                      <Text style={[styles.chipText, { color: theme.button }]}>
                        {row[item]}
                      </Text>
                      {/* </View> */}
                    </View>
                  );
                }
              } else if (item === "volunteer_name") {
                return (
                  <View key={idx} style={[styles.rowBlock]}>
                    <Text style={styles.commonText}>{row[item]}</Text>
                  </View>
                );
              } else if (item === "status") {
                return (
                  <View key={idx} style={[styles.rowBlock]}>
                    <Text
                      style={[
                        styles.commonText,
                        { textTransform: "uppercase" },
                      ]}
                    >
                      {row[item].replace(/_/g, " ")}
                    </Text>
                  </View>
                );
              } else if (item === "actions") {
                return (
                  <View key={idx} style={[styles.rowBlock]}>
                    <ContainedButton
                      onPress={() => handleRowPress(id, row)}
                      text="View"
                      width={80}
                      height={30}
                      fontSize={12}
                      textColor={theme.white}
                    />
                  </View>
                );
              }

              return <View></View>;
            })}
          </TouchableOpacity>
        );
      })}
      {at(props, "rows.length") > 0 ? (
        <View
          style={{
            display: "flex",
            position: "fixed",
            flexDirection: "row-reverse",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: props.width
              ? Math.round(props.width)
              : Math.round(width * 0.8 - 60),
            bottom: 20,
            left: 50,
            height: 30,
            paddingHorizontal: 55,
          }}
        >
          <TouchableOpacity
          disabled={(props.page >= props.pageCount) ? true : false}
          onPress={() => props.pageNavigation(props.page + 1)}
            style={{
              width: 20,
              height: 20,
              opacity: (props.page >= props.pageCount) ? 0.6 : 1
            }}
          >
            <AntDesign name="right" size={20} color={theme.button} />
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              width: 20,
              height: 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.white,
              borderWidth: 1,
              borderColor: theme.button,
              borderRadius: 5,
              marginHorizontal: 15,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: theme.button,
              }}
            >
              {props.page}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => props.pageNavigation(props.page - 1)}
            disabled={props.page <= 1 ? true : false}
            style={{
              width: 20,
              height: 20,
              opacity: props.page <= 1 ? 0.6 : 1,
            }}
          >
            <AntDesign name="left" size={20} color={theme.button} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default Table;
