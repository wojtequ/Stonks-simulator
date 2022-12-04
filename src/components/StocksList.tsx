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
import "./transactions_page.css";

const companiesLogos = {
  GOOG: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Alphabet_Inc_Logo_2015.svg/320px-Alphabet_Inc_Logo_2015.svg.png",
  TSLA: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/240px-Tesla_logo.png",
  TBLA: "data:image/png;base64,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",
  AMZN: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/600px-Amazon_icon.svg.png?20210720180728",
  AAPL: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/195px-Apple_logo_black.svg.png",
  AMD: "https://i.imgur.com/duYhRrk.png",
  SOFI: "https://w7.pngwing.com/pngs/330/518/png-transparent-refinancing-sofi-student-loan-business-business-text-rectangle-service-thumbnail.png",
  PDD: "https://www.yayaka.com/wp-content/uploads/2019/03/pinduoduo.jpg",
  NVDA: "https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/351px-Nvidia_logo.svg.png?20150924223142",
  IQ: "https://i.imgur.com/iixyKcA.png",
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
      // maxW="356px" 
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
        <Box width="55px" overflow={"hidden"}>
          <VStack display="block" float="left">
            <Text fontSize="12px">{symbol}</Text>
            <Text fontSize="12px" color="#6D6D6D" whiteSpace={"nowrap"} className="stock-list__animated-text">
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
      className="transactions-page-stock-list"
      isLoaded={stocks.length > 0 && lastDayData.length > 0}
      height="100%"
    >
      <Flex
        direction={"column"}
        gap={"6px"}
        width={"100%"}
        height={"100%"}
        // maxHeight={"420px"}
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
