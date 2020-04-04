import React , {useState}from 'react';
import {View, StyleSheet, Text} from 'react-native';
import useTheme from '../../constants/theme';
import { DrawerItems } from 'react-navigation-drawer';
import { AntDesign } from '@expo/vector-icons';
import {useSelector} from 'react-redux';
import at from 'v-at';

const Drawer  = (props) => {
let theme = useTheme();
const [asyncState, setAsyncState] = useState({});
  let saveAsync = useSelector(state => {
    return state.AsyncStorageReducer;
  });
  Promise.resolve(saveAsync).then(value => {
    setAsyncState(value);
  });
const styles = StyleSheet.create({
    root: {
        backgroundColor: theme.background,
        paddingTop: 60,
        flex: 1
    },
    userCard: {
        display: 'flex',
        flexDirection: 'row',
        height: 100,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomColor: theme.button,
        borderBottomWidth: 2
    },
    userName: {
        color: theme.text,
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bold'
    }
});

return(
    <View style={styles.root}>
        <View style={styles.userCard}>
            <AntDesign name="user" size={30}  color={theme.button}/>
            <Text style={styles.userName}>{at(asyncState  ,'metaData.activeUser') ? at(asyncState  ,'metaData.activeUser') : at(asyncState  ,'metaData.name')}</Text>

        </View>
    <View style={styles.DrawerItems}>
    <DrawerItems {...props} activeTintColor={theme.button} inactiveTintColor={theme.text} />
    </View>
  </View>
)
}

export default Drawer;