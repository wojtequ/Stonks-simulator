import { Button, ButtonGroup, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsWallet2 } from "react-icons/bs";
import { TbArrowsDownUp } from "react-icons/tb";
import { t } from "../translations/utils";

const ButtonStyle = {
  width: "100px",
  height: "73px",
};

type BallanceManagmentButtonGroupProps = {
  openAddFounds: VoidFunction;
};

export const BallanceManagmentButtonGroup: React.FC<
  BallanceManagmentButtonGroupProps
> = ({ openAddFounds }) => {
  return (
    <ButtonGroup justifySelf="center">
      <Button style={ButtonStyle}>
        <VStack>
          <Text fontSize="sm">Transfer</Text>
          <Icon w={6} h={6} as={TbArrowsDownUp} />
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
          <Text fontSize="sm">{t("details")}</Text>
          <Icon w={6} h={6} as={BsWallet2} />
        </VStack>
      </Button>
    </ButtonGroup>
  );
};
