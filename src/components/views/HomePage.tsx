import { Center, Container, SimpleGrid } from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { AddFundsModal } from "../AddFundsModal";
import { getUserNameFromSessionStorage } from "../authorization/utils";
import { BalanceCard } from "../BalanceCard";
import { BalanceManagmentButtonGroup } from "../BalanceManagmentButtonGroup";

export const HomePage = () => {
  // temporary solution
  fetch(
    `http://localhost:3000/api/balance?userName=${getUserNameFromSessionStorage()}`,
    { method: "GET" }
  )
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

  const [isAddFoundsModalOpened, setIsAddFoundsModalOpened] =
    useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);

  return (
    <Fragment>
      <Center mt={10}>
        <Container maxW="2xl">
          <SimpleGrid
            minChildWidth="312px"
            columns={2}
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <BalanceCard balance={balance} />
            <BalanceManagmentButtonGroup
              openAddFounds={() => setIsAddFoundsModalOpened(true)}
            />
            <AddFundsModal
              isOpened={isAddFoundsModalOpened}
              balance={balance}
              onClose={() => setIsAddFoundsModalOpened(false)}
            />
          </SimpleGrid>
        </Container>
      </Center>
    </Fragment>
  );
};
