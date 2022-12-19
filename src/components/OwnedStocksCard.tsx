import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";
import { t } from "../translations/utils";
import { OwnedStock, StockInfo } from "./views/TransactionsPage";

type OwnedStocksCardProps = {
  ownedStocks: OwnedStock[];
  stocks: StockInfo[];
};

export const OwnedStocksCard: React.FC<OwnedStocksCardProps> = ({
  ownedStocks,
  stocks,
}) => {
  const getLastSalePrice = (symbol: string) =>
    stocks.find((stock) => stock.symbol === symbol)?.lastSalePrice;

  return (
    <Skeleton
      className="transactions-page-stock-list"
      isLoaded={ownedStocks.length > 0 && stocks.length > 0}
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
          <Text fontSize="xl">
            {t("transactions.currently-held-shares.title")}
          </Text>
          <Flex justifyContent="space-between">
            <Text fontSize="lg">
              {t("transactions.currently-held-shares.company-name-col")}
            </Text>
            <Text fontSize="lg">
              {t("transactions.currently-held-shares.actions-col")}
            </Text>
            <Text fontSize="lg">
              {t("transactions.currently-held-shares.actual-value-col")}
            </Text>
          </Flex>
          {ownedStocks.map((ownedStock) => (
            <OwnedShare
              key={ownedStock.stockName}
              companyName={ownedStock.stockName}
              numberOfShares={ownedStock.stockCount}
              actualValue={
                Number(getLastSalePrice(ownedStock.stockName)) *
                ownedStock.stockCount
              }
            />
          ))}
        </Flex>
      </Flex>
    </Skeleton>
  );
};

type OwnedShareProps = {
  companyName: string;
  numberOfShares: number;
  actualValue: number;
};

const OwnedShare: React.FC<OwnedShareProps> = ({
  companyName,
  numberOfShares,
  actualValue,
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
          {numberOfShares}
        </Text>
        <Text fontSize="lg" color="green" width="33%" textAlign="center">
          ${actualValue.toFixed(2)}
        </Text>
      </Flex>
    </Box>
  );
};
