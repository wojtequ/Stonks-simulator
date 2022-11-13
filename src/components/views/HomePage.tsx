import {
  Center,
  Container,
  Select,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { t } from "../../translations/utils";

export const HomePage = () => {
  type Data = {
    currency: string;
    value: number;
  };
  // const SYMBOLS: string = "USD,EUR,JPY,PLN,GBP,CNY,AUD,CAD,CHF,HKD";
  const BASE_CURRENCY: string = "USD";
  //   const LATEST_URL: string = `https://api.exchangerate.host/latest?base=${BASE_CURRENCY}&symbols=${SYMBOLS}`;
  const LATEST_URL: string = `https://api.exchangerate.host/latest`;

  const [data, setData] = useState<Data[]>([]);
  const [currency, setCurrency] = useState<string>(BASE_CURRENCY);

  const handleCurrencyChange = (e: any) => {
    setCurrency(e.target.value);
  };



  useEffect(() => {
    const getData = async () => {
      const response = await fetch(LATEST_URL);
      const data = await response.json();
      const currency = Object.keys(data.rates);
      const value: number[] = Object.values(data.rates);
      const result = currency.map((item, index) => {
        return { currency: item, value: value[index] };
      });
      setData(result);
    };
    getData();
  }, [LATEST_URL]);
  const currencyData = data.find((item) => item.currency === currency);

  return (
    <Fragment>
      <Center mt={10}>
        <Container maxW="md">
          <Select onChange={handleCurrencyChange}>
            <option hidden disabled value="">
              Select currency
            </option>
            {data.map((item, index) => {
              return (
                <option key={index} value={item.currency}>
                  {item.currency}
                </option>
              );
            })}
          </Select>
          <StatGroup>
            <Stat>
              <StatLabel>
                {BASE_CURRENCY} {t("to")} {currency}
              </StatLabel>
              <StatNumber>{currencyData?.value}</StatNumber>
            </Stat>
          </StatGroup>
        </Container>
      </Center>
    </Fragment>
  );
};
