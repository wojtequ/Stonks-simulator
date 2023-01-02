import { Button, ButtonGroup, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsWallet2 } from "react-icons/bs";
import { TbArrowsDownUp } from "react-icons/tb";
import { t } from "../translations/utils";
import { NavLink } from "react-router-dom";

const ButtonStyle = {
  width: "105px",
  height: "73px",
};

type BalanceManagmentButtonGroupProps = {
  openAddFounds: VoidFunction;
};

export const BalanceManagmentButtonGroup: React.FC<
  BalanceManagmentButtonGroupProps
> = ({ openAddFounds }) => {
  return (
    <ButtonGroup justifySelf="center">
      <Button style={ButtonStyle}>
        <VStack>
          <NavLink to="/transactions">
            <Text fontSize="sm">Transfer</Text>
            <Icon mt={2} w={6} h={6} as={TbArrowsDownUp} />
          </NavLink>
        </VStack>
      </Button>
      <Button style={ButtonStyle} onClick={openAddFounds}>
        <VStack>
          <Text fontSize="sm">{t("add-funds")}</Text>
          <Icon w={6} h={6} as={AiOutlinePlus} />
        </VStack>
      </Button>
      <Button style={ButtonStyle}>
        <VStack>
          <NavLink to="/details">
            <Text fontSize="sm">{t("details")}</Text>
            <Icon mt={2} w={6} h={6} as={BsWallet2} />
          </NavLink>
        </VStack>
      </Button>
    </ButtonGroup>
  );
};
