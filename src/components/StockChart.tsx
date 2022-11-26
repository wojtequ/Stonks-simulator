import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Input,
  LightMode,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    pv: 2400,
    name: "1pm",
  },
  {
    pv: 1398,
    name: "2pm",
  },
  {
    pv: 9800,
    name: "3pm",
  },
  {
    pv: 3908,
    name: "4pm",
  },
  {
    pv: 4800,
    name: "5pm",
  },
  {
    pv: 3800,
    name: "6pm",
  },
  {
    pv: 4300,
    name: "7pm",
  },
];

enum TimePeriod {
  Day = "oneDay",
  fiveDays = "fiveDays",
  Month = "oneMonth",
  Year = "onYear",
}

export const StockChart = () => {
  const [activePeriodOfTime, setActivePeriodOfTime] = useState<TimePeriod>(
    TimePeriod.Day
  );

  const handleTimePeriodChange = (timePeriod: TimePeriod) => {
    setActivePeriodOfTime(timePeriod);
  };

  return (
    <LightMode>
      <Box
        background={"#1782FF"}
        padding="12px"
        borderRadius={"15px"}
        width="500px"
        height="480px"
      >
        <Box
          background="white"
          width="100%"
          height="100%"
          borderRadius="15px"
          padding="10px"
        >
          <ButtonGroup size={"sm"} color={"black"} height="10%">
            <Button
              aria-checked={TimePeriod.Day === activePeriodOfTime}
              _checked={{ background: "#66AFCC", color: "white" }}
              onClick={() => handleTimePeriodChange(TimePeriod.Day)}
            >
              1d
            </Button>
            <Button
              aria-checked={TimePeriod.fiveDays === activePeriodOfTime}
              _checked={{ background: "#66AFCC", color: "white" }}
              onClick={() => handleTimePeriodChange(TimePeriod.fiveDays)}
            >
              5d
            </Button>
            <Button
              aria-checked={TimePeriod.Month === activePeriodOfTime}
              _checked={{ background: "#66AFCC", color: "white" }}
              onClick={() => handleTimePeriodChange(TimePeriod.Month)}
            >
              1m
            </Button>
            <Button
              aria-checked={TimePeriod.Year === activePeriodOfTime}
              _checked={{ background: "#66AFCC", color: "white" }}
              onClick={() => handleTimePeriodChange(TimePeriod.Year)}
            >
              1y
            </Button>
          </ButtonGroup>
          <ResponsiveContainer width="100%" height="70%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 50,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis
                orientation="right"
                label={{ value: "USD", position: "top", offset: 20 }}
              />
              <Tooltip />
              <Line type="monotone" dataKey="pv" stroke="#6CB8D6" dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <Flex height="10%" gap="50px" marginTop="7%">
            <Input
              type="number"
              color="black"
              borderColor="black"
              borderStyle="solid"
              borderWidth="2px"
              width="50%"
              placeholder="How Much Auctions"
            />
            <Button background="#1782FF" width="50%" color="white">
              Buy Auction
            </Button>
          </Flex>
        </Box>
      </Box>
    </LightMode>
  );
};
