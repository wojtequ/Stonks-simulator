import {
  Box,
  Flex,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Line, LineChart, YAxis } from "recharts";
import { t } from "../translations/utils";
import { ChartData, StockInfo } from "./views/TransactionsPage";

const companiesLogos = {
  GOOG: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Alphabet_Inc_Logo_2015.svg/320px-Alphabet_Inc_Logo_2015.svg.png",
  TSLA: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/240px-Tesla_logo.png",
  TBLA: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Taboola_logo.svg/320px-Taboola_logo.svg.png",
  AMZN: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/320px-Amazon_logo.svg.png",
  AAPL: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/195px-Apple_logo_black.svg.png",
  AMD: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AMD_Logo.svg/320px-AMD_Logo.svg.png",
  SOFI: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/SoFi_logo.svg/320px-SoFi_logo.svg.png",
  PDD: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Pinduoduologo.png/320px-Pinduoduologo.png",
  NVDA: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/320px-Nvidia_logo.svg.png",
  IQ: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/IQiyi_logo.svg/320px-IQiyi_logo.svg.png",
};

const getCompanyLogo = (nameShortcut: string) => {
  switch (nameShortcut) {
    case "GOOG":
      return companiesLogos.GOOG;
    case "TSLA":
      return companiesLogos.TSLA;
    case "TBLA":
      return companiesLogos.TBLA;
    case "AMZN":
      return companiesLogos.AMZN;
    case "AAPL":
      return companiesLogos.AAPL;
    case "AMD":
      return companiesLogos.AMD;
    case "SOFI":
      return companiesLogos.SOFI;
    case "PDD":
      return companiesLogos.PDD;
    case "NVDA":
      return companiesLogos.NVDA;
    case "IQ":
      return companiesLogos.IQ;
    default:
      return "NO LOGO";
  }
};

type RadioCardProps = {
  symbol: string;
  companyName: string;
  lastSalePrice: string;
  percentageChange: string;
  chart: any;
  isSelected: boolean;
  stockChange: (stockShortcut: string) => void;
};

export const RadioCard: React.FC<RadioCardProps> = ({
  symbol,
  companyName,
  lastSalePrice,
  percentageChange,
  chart,
  isSelected,
  stockChange,
}) => {
  return (
    <Box
      cursor="pointer"
      width={"100%"}
      maxW="356px"
      minW="290px"
      color="black"
      borderWidth="2px"
      borderRadius="8px"
      backgroundColor="#FCFCFC"
      boxShadow="md"
      aria-checked={isSelected}
      _checked={{
        borderColor: "black",
      }}
      px={3}
      py={4}
      onClick={() => {
        stockChange(symbol);
      }}
    >
      <HStack spacing={5} justifyContent="space-between">
        <Image src={getCompanyLogo(symbol)} w="39px" h="39px" />
        <Box width="55px">
          <VStack display="block" float="left">
            <Text fontSize="12px">{symbol}</Text>
            <Text fontSize="12px" color="#6D6D6D">
              {companyName}
            </Text>
          </VStack>
        </Box>
        <Box>
          <LineChart width={99} height={50} data={chart}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6CB8D6"
              dot={false}
            />
            <YAxis hide domain={["dataMin", "dataMax"]} type="number" />
          </LineChart>
        </Box>
        <Box>
          <VStack
            lineHeight="1"
            display="block"
            float="right"
            textAlign="right"
          >
            <Text fontSize="16px" color="#139602">
              {percentageChange}
            </Text>
            <Text fontSize="16px" fontWeight="bold">
              {lastSalePrice}
            </Text>
            <Text fontSize="12px" color="#6D6D6D">
              {t("stock.price")}
            </Text>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
};

type StocksListProps = {
  stocks: StockInfo[];
  lastDayData: ChartData[];
  selectedStock: string;
  setSelectedStock: (symbol: string) => void;
};

export const StocksList: React.FC<StocksListProps> = ({
  stocks,
  lastDayData,
  selectedStock,
  setSelectedStock,
}) => {
  return (
    <Skeleton
      width="400px"
      isLoaded={stocks.length > 0 && lastDayData.length > 0}
    >
      <Flex
        direction={"column"}
        gap={"6px"}
        width={"fit-content"}
        //height that small for scroll tests
        height={"420px"}
        overflow={"auto"}
        background={"#1782FF"}
        padding="12px"
        borderRadius={"15px"}
      >
        {stocks.map((stock) => {
          return (
            <RadioCard
              //temp
              chart={
                lastDayData.find((element) => element.name === stock.symbol)
                  ?.chart
              }
              key={stock.symbol}
              {...stock}
              isSelected={selectedStock === stock.symbol}
              stockChange={setSelectedStock}
            ></RadioCard>
          );
        })}
      </Flex>
    </Skeleton>
  );
};
