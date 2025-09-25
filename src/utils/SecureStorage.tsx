import EncryptedStorage from 'react-native-encrypted-storage';

export async function storeToken(token: string) {
  try {
    await EncryptedStorage.setItem('user_token', token);
  } catch (e) {
    console.error('Error storing token:', e);
  }
}

export async function getToken(): Promise<string | null> {
  try {
    return await EncryptedStorage.getItem('user_token');
  } catch (e) {
    console.error('Error getting token:', e);
    return null;
  }
}

export async function clearToken() {
  try {
    await EncryptedStorage.removeItem('user_token');
  } catch (e) {
    console.error('Error clearing token:', e);
  }
}