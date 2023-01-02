import { Box, Flex, Highlight, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { t } from "../../translations/utils";
import { getJwtToken } from "../authorization/utils";
import { OwnedStocksCard } from "../OwnedStocksCard";
import { StockChart } from "../StockChart";
import { StocksList } from "../StocksList";
import { TotalWorth } from "../TotalWorth";

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

export type OwnedStock = {
  stockCount: number;
  stockName: string;
};

export const TransactionsPage = () => {
  const fetchUserStocks = () => {
    fetch("http://localhost:3000/api/usersStocks", {
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
        setOwnedStocks(json.stocks);
      })
      .catch((errorResponse) => {
        errorResponse.json().then((errorJson: { message: string }) => {
          console.error(errorJson.message);
        });
      });
  };

  const fetchUserTotalWorth = () => {
    fetch("http://localhost:3000/api/worth", {
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
        setWorth(json.worth);
      })
      .catch((errorResponse) => {
        errorResponse.json().then((errorJson: { message: string }) => {
          console.error(errorJson.message);
        });
      });
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/stocks/realtime", {
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

    fetch("http://localhost:3000/api/stocks/day", {
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
        // temporary reverse data from last day for proper display of chart
        const reversedData = json.chartData.map((data: ChartData) => {
          return { ...data, chart: [...data.chart].reverse() };
        });
        setLastDayData(reversedData);
        // setLastDayData(json.chartData);
      })
      .catch((errorResponse) => {
        errorResponse.json().then((errorJson: { message: string }) => {
          console.error(errorJson.message);
        });
      });

    fetchUserStocks();
    fetchUserTotalWorth();
  }, []);

  const [worth, setWorth] = useState<number>(0);
  const [stocks, setStocks] = useState<StockInfo[]>([]);
  const [ownedStocks, setOwnedStocks] = useState<OwnedStock[]>([]);
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
      ml={10}
      gap="50px"
      // justifyContent="center"
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
        ownedStocks={ownedStocks}
        fetchUserStocks={fetchUserStocks}
        fetchUserTotalWorth={fetchUserTotalWorth}
      />
      <OwnedStocksCard ownedStocks={ownedStocks} stocks={stocks} />
      <TotalWorth worth={worth} />
    </Flex>
  );
};
