import { Box, Flex, Text } from "@chakra-ui/react";
import { t } from "../translations/utils";

type AddBallanceCardProps = {
  ballance: number;
  newBallance: number;
};

export const AddBallanceCard: React.FC<AddBallanceCardProps> = ({
  ballance,
  newBallance,
}) => {
  return (
    <Box
      borderRadius="2xl"
      overflow={"hidden"}
      minW="310px"
      maxW="sm"
      justifySelf="center"
      boxShadow="2xl"
    >
      <Box bg={"#1782FF"}>
        <Box
          paddingLeft="15px"
          paddingTop="10px"
          paddingBottom="5px"
          textAlign={"center"}
        >
          <Text marginBottom={"1rem"} color="white">
            {t("add-funds.modal.card.title")}
          </Text>
          <Flex
            alignItems="baseline"
            alignSelf={"center"}
            display={"inline-flex"}
            marginBottom={"1.5rem"}
          >
            <Text color="white" fontSize="3xl">
              {ballance}
            </Text>
            <Text paddingLeft="5px" color="white">
              PLN
            </Text>
          </Flex>
          <Text color="white">{t("add-funds.modal.card.after-add")}</Text>
        </Box>
      </Box>
      <Box bg={"#0A58B5"}>
        <Box padding={"20px"} maxWidth={"100%"} margin={"auto"}>
          <Flex
            alignItems="baseline"
            justifyContent="center"
            textAlign={"center"}
          >
            <Text
              color="white"
              fontSize="3xl"
              overflowX="auto"
              whiteSpace={"nowrap"}
            >
              {newBallance}
            </Text>
            <Text paddingLeft="5px" color="white" fontSize="xl">
              PLN
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
