import React from "react";
import { Box, Text, Flex, Button, Icon, HStack } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { removeJwtToken } from "../authorization/utils";
import { t } from "../../translations/utils";

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
          <Text fontSize="2xl">{t("hello-user")}</Text>
          <Button onClick={handleLogout}>{t("logout")}</Button>
        </HStack>
      </Box>
    </Flex>
  );
};
