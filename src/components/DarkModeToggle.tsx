import { Flex, Icon, Switch, useColorMode } from "@chakra-ui/react";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const handleColorModeChange = debounce(() => toggleColorMode(), 100);
  const [checked, setChecked] = useState(colorMode === "dark");
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
        <Icon w={5} h={5} as={FiSun} />
      ) : (
        <Icon w={5} h={5} as={FiMoon} />
      )}
    </Flex>
  );
};
