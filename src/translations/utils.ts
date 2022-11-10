import polish from "./polish.json";
import english from "./english.json";

export enum Language {
  English = "english",
  Polish = "polish",
}

export const getActiveLanguage = () =>
  (localStorage.getItem("language") as Language) ?? Language.English;

export const t = (key: keyof typeof english) =>
  getActiveLanguage() === Language.English ? english[key] : polish[key];
