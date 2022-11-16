import { Flex, Box, Text } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { t } from "../translations/utils";

export const BallanceCard = () => {
  return (
    <Fragment>
      <Box borderRadius="2xl" overflow={"hidden"}>
        <Box bg={"#1782FF"}>
          <Box paddingLeft="15px" paddingTop="10px" paddingBottom="25px">
            <Text color="white">{t("total-balance")}</Text>
            <Flex alignItems="baseline">
              <Text color="white" fontSize="4xl">
                934,87
              </Text>
              <Text paddingLeft="5px" fontSize="xl" color="white">
                PLN
              </Text>
            </Flex>
          </Box>
        </Box>
        <Box bg={"#488AB9"}>
          <Box paddingLeft="8px" paddingBottom="20px">
            <Text color="white">{t("in-tihs-month")}</Text>
            <Flex alignItems="baseline" justifyContent="center">
              <Text color="white" fontSize="3xl">
                247,53
              </Text>
              <Text paddingLeft="5px" color="white">
                PLN
              </Text>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};
