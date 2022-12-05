import { Flex, Icon, Switch, useColorMode } from "@chakra-ui/react";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import "./color_mode_toggle.css";

export const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const handleColorModeChange = debounce(() => {
    toggleColorMode();
    sunClassName.current = "sun-icon";
    moonClassName.current = "moon-icon";
  }, 100);
  const [checked, setChecked] = useState(colorMode === "dark");
  const sunClassName = useRef<string | undefined>(undefined);
  const moonClassName = useRef<string | undefined>(undefined);
  useEffect(() => setChecked(colorMode === "dark"), [colorMode]);

  return (
    <Flex justify="space-between">
      <Switch
        isChecked={checked}
        onChange={() => {
          setChecked(!checked);
          handleColorModeChange();
        }}
        paddingRight="10px"
      />
      {colorMode === "light" ? (
        <Icon w={5} h={5} as={FiSun} className={sunClassName.current} />
      ) : (
        <Icon w={5} h={5} as={FiMoon} className={moonClassName.current} />
      )}
    </Flex>
  );
};
