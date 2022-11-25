import { Box, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Line, LineChart } from "recharts";
import { t } from "../translations/utils";

const data = [
  {
    pv: 2400,
  },
  {
    pv: 1398,
  },
  {
    pv: 9800,
  },
  {
    pv: 3908,
  },
  {
    pv: 4800,
  },
  {
    pv: 3800,
  },
  {
    pv: 4300,
  },
];

const stocks: Stock[] = [
  {
    image:
      "https://www.freepnglogos.com/uploads/apple-logo-png/file-apple-logo-black-svg-wikimedia-commons-1.png",
    shortcut: "AAPL",
    stockName: "Apple Inc.",
    price: 120,
    percentage: 2.5,
    chart: data,
  },
  {
    image:
      "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png",
    shortcut: "GOOG",
    stockName: "Google",
    price: 100,
    percentage: 1.5,
    chart: data,
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/255px-Tesla_T_symbol.svg.png?20170327222004",
    shortcut: "TSLA",
    stockName: "Tesla",
    price: 200,
    percentage: 4.5,
    chart: data,
  },
  {
    image:
      "https://www.freepnglogos.com/uploads/apple-logo-png/file-apple-logo-black-svg-wikimedia-commons-1.png",
    shortcut: "AAPL",
    stockName: "Apple Inc.",
    price: 120,
    percentage: 2.5,
    chart: data,
  },
  {
    image:
      "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png",
    shortcut: "GOOG",
    stockName: "Google",
    price: 100,
    percentage: 1.5,
    chart: data,
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/255px-Tesla_T_symbol.svg.png?20170327222004",
    shortcut: "TSLA",
    stockName: "Tesla",
    price: 200,
    percentage: 4.5,
    chart: data,
  },
  {
    image:
      "https://www.freepnglogos.com/uploads/apple-logo-png/file-apple-logo-black-svg-wikimedia-commons-1.png",
    shortcut: "AAPL",
    stockName: "Apple Inc.",
    price: 120,
    percentage: 2.5,
    chart: data,
  },
  {
    image:
      "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png",
    shortcut: "GOOG",
    stockName: "Google",
    price: 100,
    percentage: 1.5,
    chart: data,
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/255px-Tesla_T_symbol.svg.png?20170327222004",
    shortcut: "TSLA",
    stockName: "Tesla",
    price: 200,
    percentage: 4.5,
    chart: data,
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/255px-Tesla_T_symbol.svg.png?20170327222004",
    shortcut: "TSLA",
    stockName: "Tesla",
    price: 200.76,
    percentage: 4.5,
    chart: data,
  },
];

type ChartPointView = {
  pv: number;
};

type Stock = {
  image: string;
  shortcut: string;
  stockName: string;
  price: number;
  percentage: number;
  chart: ChartPointView[];
};

type RadioCardProps = {
  image: string;
  shortcut: string;
  stockName: string;
  price: number;
  percentage: number;
  chart: any;
  isSelected: boolean;
  stockChange: (stockShortcut: string) => void;
};

export const RadioCard: React.FC<RadioCardProps> = ({
  image,
  shortcut,
  stockName,
  price,
  percentage,
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
        stockChange(shortcut);
      }}
    >
      <HStack spacing={5} justifyContent='space-between'>
        <Image src={image} w="39px" h="39px" />
        <Box width='55px'>
          <VStack display="block" float="left">
            <Text fontSize="12px">{shortcut}</Text>
            <Text fontSize="12px" color="#6D6D6D">
              {stockName}
            </Text>
          </VStack>
        </Box>
        <Box>
          <LineChart width={99} height={50} data={chart}>
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#6CB8D6"
              dot={false}
            />
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
              {`${percentage}%`}
            </Text>
            <Text fontSize="16px" fontWeight="bold">
              {`${price}$`}
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

export const StocksList = () => {
  const [selectedStock, setSelectedStock] = useState<string>(
    stocks[0].shortcut
  );

  return (
    <Flex
      direction={"column"}
      gap={"6px"}
      width={"fit-content"}
      //   maxWidth={"40%"}
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
            key={stock.shortcut}
            {...stock}
            isSelected={selectedStock === stock.shortcut}
            stockChange={setSelectedStock}
          ></RadioCard>
        );
      })}
    </Flex>
  );
};
