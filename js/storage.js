const tokenKey = "token";

export function saveToken(token) {
  saveToStorage(tokenKey, token);
}
export function getToken() {
  return getFromStorage(tokenKey);
}
export function saveUserName(user) {
  saveToStorage('userName', user);
}
export function getUserName() {
  return getFromStorage('userName');
}
export function removeItemFromStore() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem('userName');
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
  const value = localStorage.getItem(key);

  if (!value) {
    return [];
  }
  return JSON.parse(value);
}