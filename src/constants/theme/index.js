import { useColorScheme } from 'react-native-appearance';

const paletteDark = {
    primary: '#363E49',
    secondary: '#414a58',
    active: '#3d71de',
    text: '#E4E9EF',
    p: '#e9edf0',
    focus: '#265abf',
    shadow: '#495363',
    success: '#11a58d',
    shadowInvert: '#181818',
    error: '#f8443f',
    white: '#fff',
    dashboard: '#363E49',
    accentDashboard: '#414a58'

  }
  const paletteLight = {

    dashboard: '#f7faff',
    accentDashboard: '#f2f6ff',
    primary: '#eeeef6',
    secondary: '#ffffff',
    active: '#3d71de',
    text: '#363E49',
    p: '#888693',
    focus: '#265abf',
    shadow: '#f8f8f8',
    shadowInvert: '#363E49',
    success: '#11a58d',
    error: '#f8443f',
    white: '#fff',
  }
 const useTheme = () => {
    let theme = useColorScheme();
    theme = 'light';
    let color = {};
    color = {
        background: theme === 'dark' ?  paletteDark.primary : paletteLight.primary,
        accent: theme === 'dark' ?  paletteDark.secondary : paletteLight.secondary,
        button: theme === 'dark' ?  paletteDark.active : paletteLight.active,
        text: theme === 'dark' ?  paletteDark.text : paletteLight.text,
        active: theme === 'dark' ?  paletteDark.focus : paletteLight.focus,
        paragraph: theme === 'dark' ?  paletteDark.p : paletteLight.p,
        shadow: theme === 'dark' ?  paletteDark.shadow : paletteLight.shadow,
        success: theme === 'dark' ?  paletteDark.success : paletteLight.success,
        white: theme === 'dark' ?  paletteDark.white : paletteLight.white,
        shadowInvert: theme === 'dark' ?  paletteDark.shadowInvert : paletteLight.shadowInvert,
        error: theme === 'dark' ?  paletteDark.error : paletteLight.error,
        accentDashboard: theme === 'dark' ?  paletteDark.accentDashboard : paletteLight.accentDashboard,
        dashboard: theme === 'dark' ?  paletteDark.dashboard : paletteLight.dashboard,
    }
    return color;
  }

  export default useTheme;