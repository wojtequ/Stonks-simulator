import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getJwtToken } from "../authorization/utils";

type TransactionData = {
  transactionDate: string;
  stockName: string;
  stockCount: number;
  buyOrSell: boolean;
  transactionCost: number;
  stockPrice: number;
};

const getFormatedDate = (date: string) => {
  const parsedDate = new Date(date);
  return `${parsedDate.getFullYear()}-${parsedDate.getMonth()}-${parsedDate.getDay()}`;
};

export const Details = () => {
  useEffect(() => {
    fetch("http://localhost:3000/api/transactionHistory", {
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
        setTransactionsHistory(json.history);
      })
      .catch((errorResponse) => {
        errorResponse.json().then((errorJson: { message: string }) => {
          console.error(errorJson.message);
        });
      });
  }, []);

  const [transactionsHistory, setTransactionsHistory] = useState<
    TransactionData[]
  >([]);

  return (
    <Box height="90vh" overflow="auto">
      <TableContainer padding="20px">
        <Table variant="striped" colorScheme="teal" size="lg" fontSize="xl">
          <Thead>
            <Tr>
              <Th textAlign="center">Transaction Type</Th>
              <Th textAlign="center">Invested Shares</Th>
              <Th textAlign="center">Company Name</Th>
              <Th textAlign="center">Date</Th>
              <Th textAlign="center">Final Balance From Transaction</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactionsHistory.map((transaction, index) => (
              <Tr key={index}>
                <Td textAlign="center">
                  {transaction.buyOrSell ? "SELL" : "BUY"}
                </Td>
                <Td textAlign="center">{transaction.stockCount}</Td>
                <Td textAlign="center">{transaction.stockName}</Td>
                <Td textAlign="center">
                  {getFormatedDate(transaction.transactionDate)}
                </Td>
                <Td
                  textAlign="center"
                  color={transaction.buyOrSell ? "green" : "red"}
                >
                  <Text as="b">
                    {transaction.buyOrSell ? "$" : "-$"}
                    {transaction.transactionCost}
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
