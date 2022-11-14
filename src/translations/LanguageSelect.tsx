import { Icon, Select } from "@chakra-ui/react";
import { useContext } from "react";
import { IoLanguage } from "react-icons/io5";
import { LanguageContext } from "../contexts/LanguageContext";
import { getActiveLanguage, Language, t } from "./utils";

export const LanguageSelect = () => {
  const languageContext = useContext(LanguageContext);
  const handleLanguageChange = (language: Language) => {
    languageContext.setActiveLanguage(language);
    localStorage.setItem("language", language);
  };

  return (
    <div style={{ maxWidth: "120px" }}>
      <Select
        defaultValue={getActiveLanguage()}
        icon={<Icon as={IoLanguage} />}
        variant="filled"
        onChange={(e) => handleLanguageChange(e.target.value as Language)}
      >
        <option value={Language.English}>{t("language.english")}</option>
        <option value={Language.Polish}>{t("language.polish")}</option>
      </Select>
    </div>
  );
};
