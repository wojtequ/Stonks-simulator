import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";

export const OwnedStocksCard = () => {
  return (
    <Skeleton
      className="transactions-page-stock-list"
      isLoaded={true}
      height="60%"
    >
      <Flex
        direction="column"
        gap="6px"
        width="100%"
        height="100%"
        overflow="auto"
        background="#1782FF"
        padding="12px"
        borderRadius="15px"
      >
        <Flex
          direction="column"
          background="white"
          width="100%"
          height="100%"
          borderRadius="15px"
          padding="10px"
          paddingTop="20px"
          color="black"
          overflow="auto"
          gap="10px"
        >
          <Text fontSize="xl">Shares Currently Held</Text>
          <Flex justifyContent="space-between">
            <Text fontSize="lg">What company</Text>
            <Text fontSize="lg">Invested</Text>
            <Text fontSize="lg">Profit/Lose</Text>
          </Flex>
          <OwnedShare
            companyName="Twitter"
            investedAmount={"17.55"}
            profitOrLose={42.76}
          />
          <OwnedShare
            companyName="Tesla"
            investedAmount={"125.7"}
            profitOrLose={49.89}
          />
          <OwnedShare
            companyName="Amazon"
            investedAmount={"190.00"}
            profitOrLose={-100.91}
          />
          <OwnedShare
            companyName="Apple"
            investedAmount={(140).toFixed(2)}
            profitOrLose={0}
          />
        </Flex>
      </Flex>
    </Skeleton>
  );
};

type OwnedShareProps = {
  companyName: string;
  investedAmount: string;
  profitOrLose: number;
};

const OwnedShare: React.FC<OwnedShareProps> = ({
  companyName,
  investedAmount,
  profitOrLose,
}) => {
  return (
    <Box
      backgroundColor="#EFEFEF"
      borderRadius="7px"
      paddingLeft="10px"
      paddingRight="10px"
      borderWidth="3px"
      borderColor="black"
    >
      <Flex justifyContent="space-between">
        <Text fontSize="lg" width="33%" textAlign="center">
          {companyName}
        </Text>
        <Text fontSize="lg" width="33%" textAlign="center">
          ${Number(investedAmount).toFixed(2)}
        </Text>
        <Text
          fontSize="lg"
          color={
            profitOrLose > 0 ? "green" : profitOrLose < 0 ? "red" : "black"
          }
          width="33%"
          textAlign="center"
        >
          ${profitOrLose.toFixed(2)}
        </Text>
      </Flex>
    </Box>
  );
};
