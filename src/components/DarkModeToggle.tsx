import { Switch, useColorMode } from "@chakra-ui/react";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { t } from "../translations/utils";

export const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const handleColorModeChange = debounce(() => toggleColorMode(), 100);
  const [checked, setChecked] = useState(colorMode === "dark");
  useEffect(() => setChecked(colorMode === "dark"), [colorMode]);

  return (
    <Switch
      isChecked={checked}
      onChange={() => {
        setChecked(!checked);
        handleColorModeChange();
      }}
    >
      {" "}
      {colorMode === "light" ? t("colormode.light") : t("colormode.dark")}
    </Switch>
  );
};
