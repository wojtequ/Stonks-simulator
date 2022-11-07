import {
    Button,
    Center,
    Container,
    Flex,
    Select,
    Spacer,
    Stat,
    StatGroup,
    StatLabel,
    StatNumber
} from "@chakra-ui/react";
import React, {Fragment, useEffect, useState} from "react";
import {removeJwtToken} from "./authorization/utils";
import {DarkModeToggle} from "./DarkModeToggle";

export const HomePage = () => {
    type Data = {
        currency: string,
        value: number
    }
    const SYMBOLS: string = 'USD,EUR,JPY,PLN,GBP,CNY,AUD,CAD,CHF,HKD'
    const BASE_CURRENCY: string = 'USD'
    const LATEST_URL: string = `https://api.exchangerate.host/latest?base=${BASE_CURRENCY}&symbols=${SYMBOLS}`

    const [data, setData] = useState<Data[]>([])
    const [currency, setCurrency] = useState<string>(BASE_CURRENCY)

    const handleCurrencyChange = (e: any) => {
        setCurrency(e.target.value)
    }

    const handleLogout = () => {
        removeJwtToken();
        window.location.reload();
    };

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(LATEST_URL)
            const data = await response.json()
            const currency = Object.keys(data.rates)
            const value: number[] = Object.values(data.rates)
            const result = currency.map((item, index) => {
                return {currency: item, value: value[index]}
            })
            setData(result)
        };
        getData();
    }, [])
    const currencyData = data.find(item => item.currency === currency)

    return (
        <Fragment>
            <Flex m={5}>
                <DarkModeToggle/>
                <Spacer/>
                <Button onClick={handleLogout}>Logout</Button>
            </Flex>
            <Center>
                <Container maxW='md'>
                    <Select onChange={handleCurrencyChange}>
                        <option hidden disabled value="">Select currency</option>
                        {data.map((item, index) => {
                            return <option key={index} value={item.currency}>{item.currency}
                            </option>
                        })}
                    </Select>
                    <StatGroup>
                        <Stat>
                            <StatLabel>{BASE_CURRENCY} to {currency}</StatLabel>
                            <StatNumber>{currencyData?.value}</StatNumber>
                        </Stat>
                    </StatGroup>

                </Container>
            </Center>
        </Fragment>
    );
};
