export function getJwtToken() {
  return sessionStorage.getItem("jwt");
}

export function setJwtToken(token: string) {
  sessionStorage.setItem("jwt", token);
}

export const removeJwtToken = () => sessionStorage.removeItem("jwt");

export const isMobile = () => "ontouchstart" in window;
