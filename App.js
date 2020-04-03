import React, { useState } from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./src/store";
import Navigator from "./src/navigators";
import { AppearanceProvider } from "react-native-appearance";
import * as Localization from 'expo-localization';
import  constants from './src/constants/language/constants.json'
import i18n from 'i18n-js';
import {useLanguage} from './src/constants/language/LanguageHook';
i18n.translations = constants;
i18n.locale = Localization.locale;
i18n.fallbacks = true;
export default function App() {
  const [language, setNewLanguage] = useLanguage();
  if(language)  {
    i18n.locale = language;
  }
  
  return (
    <Provider store={store}>
      <AppearanceProvider>
        <Navigator />
      </AppearanceProvider>
    </Provider>
  );
}
