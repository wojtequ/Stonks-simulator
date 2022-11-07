import { Switch, useColorMode } from "@chakra-ui/react";
import { debounce } from "lodash";
import { useEffect, useState } from "react";

export const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const handleColorModeChange = debounce(() => toggleColorMode(), 100);
  const [checked, setChecked] = useState(colorMode === "dark");
  useEffect(() => setChecked(colorMode === "dark"), [colorMode]);
  console.log(colorMode);
  return (
    <Switch
      isChecked={checked}
      onChange={() => {
        setChecked(!checked);
        handleColorModeChange();
      }}
    >
      {" "}
      {colorMode === "light" ? "Light" : "Dark"} mode
    </Switch>
  );
};
