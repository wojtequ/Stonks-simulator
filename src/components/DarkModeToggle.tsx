import React from "react";
import { Switch, useColorMode } from "@chakra-ui/react";
import { debounce } from "lodash";

export const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const handleColorModeChange = debounce(() => toggleColorMode(), 100);

  return (
    <Switch isChecked={colorMode === "dark"} onChange={handleColorModeChange}>
      {" "}
      {colorMode === "light" ? "Light" : "Dark"} mode
    </Switch>
  );
};
