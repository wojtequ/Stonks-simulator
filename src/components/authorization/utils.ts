export function getJwtToken() {
  return sessionStorage.getItem("jwt");
}

export function getUserNameFromSessionStorage() {
  return sessionStorage.getItem("userName");
}

export function setJwtToken(token: string) {
  sessionStorage.setItem("jwt", token);
}

export function setUserNameInSessionStorage(userName: string) {
  sessionStorage.setItem("userName", userName);
}

export const removeJwtToken = () => sessionStorage.removeItem("jwt");

export const isMobile = () => "ontouchstart" in window;
