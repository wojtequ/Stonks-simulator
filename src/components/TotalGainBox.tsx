import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";
import { t } from "../translations/utils";
import { OwnedStock, StockInfo } from "./views/TransactionsPage";
import { useEffect, useState } from "react";
import { getJwtToken } from "./authorization/utils";

var stockBalance = {}

type totalGainBoxProps = {
    ownedStocks: OwnedStock[];
    stocks: StockInfo[];
}
export const TotalGainBox: React.FC<totalGainBoxProps> = ({
    ownedStocks,
    stocks
    }) => {
    //console.log("Calculating total gain");
    //console.log(ownedStocks);

    fetch("/api/totalGain", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getJwtToken()}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((responseJ) => {
                //console.log(responseJ.summary)

                for(const [code, bal] of Object.entries(responseJ.summary)) {
                    stockBalance[String(code)] = Number(bal);
                }
            })
            .then((json) => {
                    return [];
                })
            .catch((errorResponse) => {
                console.error(errorResponse)
            });

    //console.log("Val:")
    console.log(ownedStocks)
    let totalGain = 0


    for(const stock of ownedStocks) {
        let transactionHistory = stockBalance[stock.stockName]
        let rev = Number(stocks.find((cmp) => cmp.symbol === stock.stockName)?.lastSalePrice) * Number(stock.stockCount)

        console.log(transactionHistory)
        console.log(rev)
        totalGain += (transactionHistory + rev)
    }
    console.log(stockBalance)
    return (
        <Skeleton
            className="transactions-page-total-gain"
            isLoaded={true}
            height="20%"
        >
            <Flex
                direction="column"
                gap="6px"
                width="100%"
                height="100%"
                overflow="auto"
                background="#1782FF"
                padding="12px"
                borderRadius="5px"
            >
                <Flex
                    direction="column"
                    background="white"
                    width="100%"
                    height="100%"
                    borderRadius="5px"
                    padding="10px"
                    paddingTop="20px"
                    color="black"
                    overflow="auto"
                    gap="10px"
                >
                    <Text fontSize="xl" color = {totalGain > 0 ? "green" : "red"}>
                        {t("transactions.currently-held-shares.totalGain")}: ${totalGain.toFixed(2)}
                    </Text>
                </Flex>
            </Flex>
        </Skeleton>
    );
};
