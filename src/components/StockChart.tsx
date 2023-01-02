import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Input,
  LightMode,
  Skeleton,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip as SliderTooltip,
  useToast,
} from "@chakra-ui/react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { t } from "../translations/utils";
import { getJwtToken } from "./authorization/utils";
import { TransactionModal } from "./TransactionModal";
import "./transactions_page.css";
import {
  ChartData,
  ChartPoint,
  OwnedStock,
  StockInfo,
} from "./views/TransactionsPage";

enum TimePeriod {
  Day = "oneDay",
  fiveDays = "fiveDays",
  Month = "oneMonth",
  Year = "onYear",
}

type StockChartProps = {
  stocks: StockInfo[];
  selectedStock: string;
  lastDayData: ChartData[];
  ownedStocks: OwnedStock[];
  fetchUserStocks: VoidFunction;
};

export const StockChart: React.FC<StockChartProps> = ({
  stocks,
  selectedStock,
  lastDayData,
  ownedStocks,
  fetchUserStocks
}) => {
  const getOwnedStocks = () =>
    ownedStocks.find((stock) => stock.stockName === selectedStock);

  const getActualPriceOfSelectedStock = () =>
    stocks.find((stock) => stock.symbol === selectedStock)?.lastSalePrice;

  const [activePeriodOfTime, setActivePeriodOfTime] = useState<TimePeriod>(
    TimePeriod.Day
  );

  const [showSliderTooltip, setShowSliderTooltip] = useState(false);
  const [sliderValue, setSliderValue] = useState(
    getOwnedStocks()?.stockCount ?? 0
  );

  const toast = useToast();

  const finalPrice = useRef(0);

  const getSelectedStockPrice = Number(
    stocks.find((stock) => stock.symbol === selectedStock)?.lastSalePrice
  );

  const handleNumberOfStockHange = (numberOfStocks: number) => {
    setAuctions(numberOfStocks);
    finalPrice.current = Number(
      Number(numberOfStocks * getSelectedStockPrice).toFixed(2)
    );
  };

  useEffect(() => {
    setSliderValue(getOwnedStocks()?.stockCount ?? 0);
  }, [selectedStock]);

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
        `/api/stocks/date/?symbol=${symbol}&days=${days}`,
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

  const [balance, setBalance] = useState<number>(0);

  fetch(`/api/balance`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((json) => {
      setBalance(json.balance);
    })
    .catch((errorResponse) => {
      errorResponse.json().then((errorJson: { message: string }) => {
        console.error(errorJson.message);
      });
    });

  const [auctions, setAuctions] = useState<number>(0);
  const [isTransactionModalOpened, setIsTransacitonModalOpened] =
    useState<boolean>(false);
  const [data, setData] = useState<ChartPoint[]>([]);

  useEffect(() => {
    finalPrice.current = auctions * getSelectedStockPrice;
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
  const submitTransaction = () => {
    fetch(`/api/buy`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stockCount: auctions,
        stockName: selectedStock,
        price: getSelectedStockPrice,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((json) => {
        fetchUserStocks();
        toast({
          title: t("toast.homepage.add.funds.success"),
          status: "success",
          duration: 2500,
          isClosable: true,
        });
      })
      .catch((errorResponse) => {
        errorResponse.json().then((errorJson: { message: string }) => {
          if (errorJson.message === "Insufficient funds") {
            toast({
              title: t("toast.homepage.add.funds.error"),
              status: "error",
              duration: 2500,
              isClosable: true,
            });
          }
          console.error(errorJson.message);
        });
      });
  };

  const sellStocks = () =>
    fetch(`/api/sell`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stockCount: sliderValue,
        stockName: selectedStock,
        price: getActualPriceOfSelectedStock(),
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((json) => {
        fetchUserStocks();
        toast({
          title: `Stocks sold +$${(
            sliderValue * Number(getActualPriceOfSelectedStock())
          ).toFixed(2)} has been succesfull added to your account`,
          status: "success",
          duration: 2500,
          isClosable: true,
        });
      })
      .catch((errorResponse) => {
        errorResponse.json().then((errorJson: { message: string }) => {
          toast({
            title: errorJson.message,
            status: "error",
            duration: 2500,
            isClosable: true,
          });
          console.error(errorJson.message);
        });
      });

  return (
    <Fragment>
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
            <Skeleton width="100%" height="60%" isLoaded={data.length > 0}>
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
                    type="linear"
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
                onChange={(e) =>
                  handleNumberOfStockHange(Number(e.target.value))
                }
                width="50%"
                placeholder={t("transactions.chart.buy.placeholder")}
              />
              <Button
                background="#1782FF"
                width="50%"
                color="white"
                // disabled={balance-auctions}
                onClick={() => setIsTransacitonModalOpened(true)}
              >
                {t("transactions.chart.button.buy")}
              </Button>
            </Flex>
            <Flex height="10%" gap="50px" mt={15}>
              <Box width="50%">
                <Slider
                  id="slider"
                  defaultValue={getOwnedStocks()?.stockCount ?? 0}
                  min={0}
                  max={getOwnedStocks()?.stockCount ?? 0}
                  step={0.1}
                  value={sliderValue}
                  isDisabled={!getOwnedStocks()}
                  colorScheme="teal"
                  color="black"
                  onChange={(v) => setSliderValue(v)}
                  onMouseEnter={() => setShowSliderTooltip(true)}
                  onMouseLeave={() => setShowSliderTooltip(false)}
                >
                  <SliderMark value={0} mt="1" fontSize="md">
                    0
                  </SliderMark>
                  {!!getOwnedStocks() && (
                    <SliderMark
                      value={getOwnedStocks()?.stockCount ?? 0}
                      mt="1"
                      ml="-2.5"
                      fontSize=" md"
                    >
                      {getOwnedStocks()?.stockCount.toFixed(1)}
                    </SliderMark>
                  )}
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderTooltip
                    hasArrow
                    bg="teal.500"
                    color="white"
                    placement="top"
                    isOpen={showSliderTooltip}
                    label={`${sliderValue}`}
                  >
                    <SliderThumb />
                  </SliderTooltip>
                </Slider>
              </Box>
              <Button
                background="whatsapp.500"
                width="50%"
                color="white"
                disabled={!getOwnedStocks()}
                onClick={sellStocks}
              >
                {t("transactions.chart.button.sell")}
              </Button>
            </Flex>
          </Box>
        </Box>
      </LightMode>
      <TransactionModal
        isOpened={isTransactionModalOpened}
        auctions={finalPrice.current}
        balance={balance}
        onSubmit={submitTransaction}
        onClose={() => setIsTransacitonModalOpened(false)}
      />
    </Fragment>
  );
};
