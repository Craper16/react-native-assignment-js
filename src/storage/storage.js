import { MMKV } from "react-native-mmkv";

export const storage = new MMKV({
    id: 'accessToken',
    encryptionKey: 'accessToken'
})

storage.recrypt('encryption1');