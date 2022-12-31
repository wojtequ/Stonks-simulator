import { Center, Container, SimpleGrid, useToast } from "@chakra-ui/react";
import { Fragment, useCallback, useState } from "react";
import { t } from "../../translations/utils";
import { AddFundsModal } from "../AddFundsModal";
import { getJwtToken } from "../authorization/utils";
import { BalanceCard } from "../BalanceCard";
import { BalanceManagmentButtonGroup } from "../BalanceManagmentButtonGroup";

export const HomePage = () => {
  const toast = useToast();

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

  const submitNewBalance = useCallback(
    (addedBalance: number) => {
      fetch(`/api/balance`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getJwtToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ balance: addedBalance }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((json) => {
          toast({
            title: t("toast.homepage.add.funds.success"),
            status: "success",
            duration: 2500,
            isClosable: true,
          });
        })
        .catch((errorResponse) => {
          errorResponse.json().then((errorJson: { message: string }) => {
            console.error(errorJson.message);
          });
        });
    },
    [toast]
  );

  const [isAddFoundsModalOpened, setIsAddFoundsModalOpened] =
    useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);
  return (
    <Fragment>
      <Center mt={10}>
        <Container maxW="2xl">
          <SimpleGrid
            minChildWidth="420px"
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
              onSubmit={submitNewBalance}
              onClose={() => setIsAddFoundsModalOpened(false)}
            />
          </SimpleGrid>
        </Container>
      </Center>
    </Fragment>
  );
};
