import SecureStore from 'expo-secure-store'

export async function saveUser(key, value) {
    await SecureStore.setItemAsync(key, value)
}

export async function getUserData(key) {
    let result = await SecureStore.getItemAsync(key)
    if (result) {
        return result
    }
}
