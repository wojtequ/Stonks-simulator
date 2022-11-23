import { Fragment } from "react";
import {
  Center,
  Box,
  useRadio,
  useRadioGroup,
  VStack,
  Image,
  Text,
  HStack,
} from "@chakra-ui/react";
import { LineChart, Line } from "recharts";

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

const stocks = [
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
];

type RadioCardProps = {
  image: string;
  shortcut: string;
  stockName: string;
  price: number;
  percentage: number;
  chart: any;
};

export const RadioCard: React.FC<RadioCardProps> = ({
  image,
  shortcut,
  stockName,
  price,
  percentage,
  chart,
}) => {
  const { getInputProps, getCheckboxProps } = useRadio({
    value: shortcut,
  });

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        maxW="sm"
        minW="329px"
        minH="71px"
        color="black"
        borderWidth="2px"
        borderRadius="8px"
        backgroundColor="#FCFCFC"
        boxShadow="md"
        _checked={{
          borderColor: "black",
        }}
        px={2}
        py={3}
      >
        <HStack spacing={4}>
          <Image src={image} w="39px" h="39px" />
          <Box>
            <VStack display="block" float="left">
              <Text fontSize="12px">{shortcut}</Text>
              <Text fontSize="12px" color="#6D6D6D">
                {stockName}
              </Text>
            </VStack>
          </Box>
          <Box>
            <LineChart width={99} height={50} data={chart}>
              <Line type="monotone" dataKey="pv" stroke="#6CB8D6" dot={false} />
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
                {percentage}
              </Text>
              <Text fontSize="16px" fontWeight="bold">
                {price}
              </Text>
              <Text fontSize="12px" color="#6D6D6D">
                Auction price
              </Text>
            </VStack>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export const Transactions = () => {
  const handleChange = (value: string) => {
    console.log(value);
  };

  const { value, getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: "AAPL",
    onChange: handleChange,
  });

  return (
    <Fragment>
      <Center mt="50px">
        <Text>The selected radio is: {value}</Text>
        <VStack {...getRootProps()}>
          {stocks.map((stock) => {
            return (
              <RadioCard
                key={stock.shortcut}
                image={stock.image}
                shortcut={stock.shortcut}
                stockName={stock.stockName}
                price={stock.price}
                percentage={stock.percentage}
                chart={stock.chart}
                {...getRadioProps({ value: stock.shortcut })}
              ></RadioCard>
            );
          })}
        </VStack>
      </Center>
    </Fragment>
  );
};
