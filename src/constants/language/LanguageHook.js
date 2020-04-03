import { useEffect, useState } from 'react';
import { AsyncStorage } from "react-native";


export const useLanguage = () => {
  const [language, setLanguage] = useState(null);
  const setNewLanguage = async(language) => {
    let storage = JSON.parse(await AsyncStorage.getItem('@storage'));
    storage ={ ...storage, ...{language: language}}
    
    AsyncStorage.setItem('@storage', JSON.stringify(storage));
  };

  const setLastLanguage = async() => {
    let storage = JSON.parse(await AsyncStorage.getItem('@storage'));
    if(storage && storage.language) {
        setLanguage(storage.language);
    }

  }

  useEffect(() => {
    setLastLanguage();
  }, []);

  return [language, setNewLanguage]
};
