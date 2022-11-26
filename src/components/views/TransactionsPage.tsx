import { Flex } from "@chakra-ui/react";
import { StockChart } from "../StockChart";
import { StocksList } from "../StocksList";

export const TransactionsPage = () => {
  return (
    <Flex padding={"30px"} gap="50px">
      <StocksList />
      <StockChart />
    </Flex>
  );
};
