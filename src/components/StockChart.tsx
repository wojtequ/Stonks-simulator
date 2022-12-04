import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Input,
  LightMode,
  Skeleton,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartData, ChartPoint } from "./views/TransactionsPage";
import "./transactions_page.css";

enum TimePeriod {
  Day = "oneDay",
  fiveDays = "fiveDays",
  Month = "oneMonth",
  Year = "onYear",
}

type StockChartProps = {
  selectedStock: string;
  lastDayData: ChartData[];
};

export const StockChart: React.FC<StockChartProps> = ({
  selectedStock,
  lastDayData,
}) => {
  const [activePeriodOfTime, setActivePeriodOfTime] = useState<TimePeriod>(
    TimePeriod.Day
  );

  const setChartDataForActiveStock = useCallback(() => {
    switch (activePeriodOfTime) {
      case TimePeriod.fiveDays:
        fetchChartData(5, selectedStock);
        break;
      case TimePeriod.Month:
        fetchChartData(31, selectedStock);
        break;
      case TimePeriod.Year:
        fetchChartData(365, selectedStock);
        break;
      case TimePeriod.Day:
      default:
        setData(
          lastDayData.find((element) => element.name === selectedStock)
            ?.chart ?? []
        );
        break;
    }
  }, [lastDayData, selectedStock]);

  const fetchChartData = useCallback(
    (days: number, symbol: string) =>
      fetch(
        `http://localhost:3000/api/stocks/date/?symbol=${symbol}&days=${days}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((json) => {
          setData(json.historicalDate);
        })
        .catch((errorResponse) => {
          errorResponse.json().then((errorJson: { message: string }) => {
            console.error(errorJson.message);
          });
        }),
    []
  );

  const [data, setData] = useState<ChartPoint[]>([]);

  useEffect(() => {
    setChartDataForActiveStock();
  }, [selectedStock, lastDayData]);

  const handleTimePeriodChange = (timePeriod: TimePeriod) => {
    setActivePeriodOfTime(timePeriod);
    switch (timePeriod) {
      case TimePeriod.Day:
        setData(
          lastDayData.find((element) => element.name === selectedStock)
            ?.chart ?? []
        );
        break;
      case TimePeriod.fiveDays:
        setData([]);
        fetchChartData(5, selectedStock);
        break;
      case TimePeriod.Month:
        setData([]);
        fetchChartData(31, selectedStock);
        break;
      case TimePeriod.Year:
        setData([]);
        fetchChartData(365, selectedStock);
        break;
      default:
        break;
    }
  };

  return (
    <LightMode>
      <Box
        background={"#1782FF"}
        padding="12px"
        borderRadius={"15px"}
        // width="50%"
        height="100%"
        minW="390px"
        minH="50vh"
        className="transactions-page__card"
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
          <Skeleton width="100%" height="70%" isLoaded={data.length > 0}>
            <ResponsiveContainer width="100%" height="100%">
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
                <XAxis dataKey="dateTime" minTickGap={20} />
                <YAxis
                  orientation="right"
                  label={{ value: "USD", position: "top", offset: 20 }}
                  domain={["dataMin", "dataMax"]}
                />
                <Tooltip labelStyle={{ color: "black" }} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6CB8D6"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Skeleton>
          <Flex height="10%" gap="50px" mt={30}>
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
