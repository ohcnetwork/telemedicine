import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import useTheme from "../../constants/theme";


const Menu = (props) => {
    let theme = useTheme();

    return(
        <View style={{
            position: 'absolute',
            width: 230,
            height: props.height? props.height : 250,
            backgroundColor: props.backgroundColor? props.backgroundColor: theme.dashboard,
            zIndex: 10,
            top: 0,
            right: props.right? props.right: 60,
            borderRadius: 5,
            padding: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderColor: props.height? theme.accent : theme.accentDashboard,
            borderWidth: 1
          }}>
              {(props.data) ? props.data.map((item) => {
                  return(
                      <TouchableOpacity 
                      onPress={() => props.onPress(item)}
                      style={{
                          width: 180,
                          backgroundColor: props.backgroundColor? props.backgroundColor : theme.accentDashboard,
                          borderBottomColor: props.height? theme.accent : theme.accentDashboard,
                          borderBottomWidth: 1,
                          height: props.height? Math.round((props.height/ props.data.length) - 10 ) : 45,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          flexDirection: 'row'

                      }}>
                          <Text>{item.label}</Text>

                      </TouchableOpacity>
                  )
              }) : null}


          </View>
    )
}

export default Menu;