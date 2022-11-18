import { Box, Button, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { t } from "../../translations/utils";
import {
  getUserNameFromSessionStorage,
  removeJwtToken,
} from "../authorization/utils";

type HeaderProps = {
  onShowSidebar: VoidFunction;
  showSidebarButton?: boolean;
};
export const Header: React.FC<HeaderProps> = ({
  onShowSidebar,
  showSidebarButton = true,
}) => {
  const handleLogout = () => {
    removeJwtToken();
    window.location.reload();
  };

  return (
    <Flex
      p={4}
      justifyContent="flex-end"
      style={{ borderBottom: "solid black 1px" }}
    >
      <Box flex="1" maxWidth="55px">
        {showSidebarButton && (
          <Button onClick={onShowSidebar}>
            <Icon as={GiHamburgerMenu} />
          </Button>
        )}
      </Box>
      <Box flex="1">
        <HStack spacing={4} justifyContent="right">
          <Text fontSize="2xl">{`${t(
            "hello-user"
          )}${getUserNameFromSessionStorage()}`}</Text>
          <Button onClick={handleLogout}>{t("logout")}</Button>
        </HStack>
      </Box>
    </Flex>
  );
};
