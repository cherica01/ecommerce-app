import AsyncStorage from "@react-native-async-storage/async-storage";

export const setObject = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("Storage set error", e);
  }
};

export const getObject = async (key: string) => {
  try {
    const s = await AsyncStorage.getItem(key);
    return s ? JSON.parse(s) : null;
  } catch (e) {
    console.warn("Storage get error", e);
    return null;
  }
};
