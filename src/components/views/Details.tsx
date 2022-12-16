import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

type TransactionData = {
  transactionDate: string;
  stockName: string;
  stockCount: number;
  buyOrSell: boolean;
  transactionCost: number;
  stockPrice: number;
};

export const Details = () => {
  //   useEffect(() => {
  //     fetch("http://localhost:3000/api/usersStocks", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${getJwtToken()}`,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json();
  //         }
  //         return Promise.reject(response);
  //       })
  //       .then((json) => {
  //         setOwnedStocks(json.stocks);
  //       })
  //       .catch((errorResponse) => {
  //         errorResponse.json().then((errorJson: { message: string }) => {
  //           console.error(errorJson.message);
  //         });
  //       });
  //   }, []);

  return (
    <TableContainer padding="20px">
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th textAlign="center">Transaction Type</Th>
            <Th isNumeric textAlign="center">
              Invested Shares
            </Th>
            <Th textAlign="center">Company Name</Th>
            <Th textAlign="center">Date</Th>
            <Th textAlign="center">Final Balance From Transaction</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td textAlign="center">inches</Td>
            <Td isNumeric textAlign="center">
              25.4
            </Td>
            <Td textAlign="center">millimetres (mm)</Td>
            <Td textAlign="center">millimetres (mm)</Td>
            <Td textAlign="center">millimetres (mm)</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
