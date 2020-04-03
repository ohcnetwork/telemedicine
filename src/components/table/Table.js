import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import useTheme from "../../constants/theme";
import moment from "moment";
import {ContainedButton} from '../button/Button';

const Table = props => {
  const header = [
    "patient",
    "time",
    "priority",
    "volunteer",
    "status",
    "actions"
  ];

  const rows = [
    {
      patient: {name: "Abraham George", phone: '7012912325'},
      priority: "high",
      time: moment(),
      volunteer: "Vinayak Nair",
      status: "Not-Attended",
      actions: "View",
    },
    {
        patient: {name: "Anoop Jacob", phone: '7012599799'},
        priority: "medium",
        time: moment(),
        volunteer: "Vinayak Nair",
        status: "Not-Attended",
        actions: "View"
    },
    {
        patient: {name: "Gokul Krishnan", phone: '7012599799'},
        priority: "medium",
        time: moment(),
        volunteer: "Vinayak Nair",
        status: "Not-Attended",
        actions: "View",
    },
    {
        patient: {name: "Lakshmi K", phone: '7012599799'},
        priority: "high",
        time: moment(),
        volunteer: "Vinayak Nair",
        status: "Not-Attended",
        actions: "View"
    },
    {
        patient: {name: "Olin Thomas", phone: '7012599799'},
        priority: "medium",
        time: moment(),
        volunteer: "Vinayak Nair",
        status: "Not-Attended",
        actions: "View"
    }
  ];

  let theme = useTheme();
  let width = Math.round(Dimensions.get("window").width);
  let height = Math.round(Dimensions.get("window").height);
  const styles = StyleSheet.create({
    table: {
      width: props.width ? props.width : width * 0.8,
      padding: 30,
      height: height * 0.75,
      backgroundColor: theme.accent
    },
    header: {
      height: 40,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start"
    },
    rows: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      width: props.width
        ? Math.round(props.width - 60)
        : Math.round(width * 0.8 - 60),
      height: 60,
      borderBottomColor: theme.shadow,
      borderBottomWidth: 1,
    },
    headerBlock: {
      width: props.width ? Math.round((props.width - 60) / header.length) : 200,
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 1,
      height: 40,
      borderBottomColor: theme.shadow
    },
    headerText: {
      color: theme.paragraph,
      fontSize: 12,
      fontWeight: "600",
      textTransform: 'capitalize'
    },
    rowBlock: {
      width: props.width ? Math.round((props.width - 60) / header.length) : 200,
      alignItems: "center",
      justifyContent: "center",
      height: 60
    },
    patientBlock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    patientName: {
        color: theme.text,
        fontSize: 13,
        fontWeight: 'bold'
    },
    patientPhone: {
        color: theme.paragraph,
        fontSize: 12,
        fontWeight: 'bold'
    },
    commonText: {
        color: theme.text,
        fontSize: 11,
        fontWeight: '600'
    },
    chip: {
        width: props.width ? Math.round(((props.width - 60) / header.length) - 60) : 200, 
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.button
    },
    chipText: {
        color: theme.white,
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
  });

  const[active, setActive] = useState(null);

  const handleRowPress = (id) => {
     setActive(id);
  }
  return (
    <View style={styles.table}>
      <View style={styles.header}>
        {header.map((item, idx) => {
          return (
            <View key={idx} style={item === 'patient' ?[styles.headerBlock, {alignItems: 'flex-start'}] : [styles.headerBlock]}>
              <Text style={styles.headerText}>{item}</Text>
            </View>
          );
        })}
      </View>
      {rows.map((row, idx) => {
        return <TouchableOpacity onPress={() => handleRowPress(idx)} key={idx} style={[styles.rows, {backgroundColor: (active === idx) ? theme.dashboard: theme.accent}]}>
            {header.map((item, idx) => {
               if(item === 'patient') {
                return(
                    <View key={idx} style={[styles.rowBlock, {alignItems: 'flex-start'}]}>
                        
                    <View style={styles.patientBlock}>
                <Text style={styles.patientName}>{row[item].name}</Text>
                <Text style={styles.patientPhone}>{row[item].phone}</Text>
                    </View>
                    </View> )
               }
               else if(item === 'time') {
                   return(
                    <View key={idx} style={[styles.rowBlock]}>
                        <Text style={styles.commonText}>{moment(row[item]).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                        </View>
                   )
               }
               else if(item === 'priority') {
                   if(row[item] === 'high'){
                    return(
                        <View key={idx} style={[styles.rowBlock]}>
                            {/* <View style={[styles.chip, {backgroundColor: theme.error}]}> */}
                            <Text style={[styles.chipText, { color: theme.error}]}>{row[item]}</Text>
                            {/* </View> */}
                            </View>
                       )
                   } else {
                    return(
                        <View key={idx} style={[styles.rowBlock]}>
                            {/* <View style={[styles.chip]}> */}
                            <Text style={[styles.chipText, {color: theme.button}]}>{row[item]}</Text>
                            {/* </View> */}
                            </View>
                       ) 
                   }
               
            }
               else if(item === 'volunteer') {
                return(
                 <View key={idx} style={[styles.rowBlock]}>
                     <Text style={styles.commonText}>{row[item]}</Text>
                     </View>
                )
            }
            else if(item === 'status') {
                return(
                 <View key={idx} style={[styles.rowBlock]}>
                     <Text style={styles.commonText}>{row[item]}</Text>
                     </View>
                )
            }
            else if(item === 'actions') {
                return(
                 <View key={idx} style={[styles.rowBlock]}>
                     <ContainedButton text="View" width= {80} height ={30} fontSize={12} textColor={theme.white} />
                     </View>
                )
            }


               
               
               return(
                   <View>
                   </View>
               )
               
            })}
        </TouchableOpacity>;
      })}
    </View>
  );
};

export default Table;
