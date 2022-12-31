import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { StockChart } from "../StockChart";
import { StocksList } from "../StocksList";

export type StockInfo = {
  companyName: string;
  deltaIndicator: string;
  lastSalePrice: string;
  percentageChange: string;
  symbol: string;
};

export type ChartData = {
  name: string;
  chart: ChartPoint[];
};

export type ChartPoint = {
  dateTime: string;
  value: number;
};

export const TransactionsPage = () => {
  useEffect(() => {
    fetch("/api/stocks/realtime", {
      method: "GET",
      headers: {
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
        setStocks(json.stocks);
      })
      .catch((errorResponse) => {
        errorResponse.json().then((errorJson: { message: string }) => {
          console.error(errorJson.message);
        });
      });

    fetch("/api/stocks/day", {
      method: "GET",
      headers: {
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
        setLastDayData(json.chartData);
      })
      .catch((errorResponse) => {
        errorResponse.json().then((errorJson: { message: string }) => {
          console.error(errorJson.message);
        });
      });
  }, []);

  const [stocks, setStocks] = useState<StockInfo[]>([]);
  const [selectedStock, setSelectedStock] = useState<string>(
    stocks[0]?.symbol ?? ""
  );

  useEffect(() => {
    if (!selectedStock && stocks.length) {
      setSelectedStock(stocks[0].symbol);
    }
  }, [stocks]);

  const [lastDayData, setLastDayData] = useState<ChartData[]>([]);

  return (
    <Flex
      mt={10}
      gap="50px"
      justifyContent="center"
      direction="row"
      height="50vh"
      flexWrap="wrap"
    >
      <StocksList
        stocks={stocks}
        selectedStock={selectedStock}
        setSelectedStock={setSelectedStock}
        lastDayData={lastDayData}
      />
      <StockChart
        selectedStock={selectedStock}
        stocks={stocks}
        lastDayData={lastDayData}
      />
    </Flex>
  );
};
