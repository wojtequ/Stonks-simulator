import {
  Button,
  Center,
  Container,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
} from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { t } from "../../translations/utils";
import { BallanceCard } from "../BallanceCard";
import { BallanceManagmentButtonGroup } from "../BallanceManagmentButtonGroup";

export const HomePage = () => {
  const [isAddFoundsModalOpened, setIsAddFoundsModalOpened] =
    useState<boolean>(false);
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
            <BallanceCard />
            <BallanceManagmentButtonGroup
              openAddFounds={() => setIsAddFoundsModalOpened(true)}
            />
            <Modal
              isOpen={isAddFoundsModalOpened}
              isCentered
              onClose={() => setIsAddFoundsModalOpened(false)}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <ModalCloseButton />
                </ModalHeader>
                <ModalBody padding={"10%"}>
                  {/* <Flex> */}
                  <Flex direction={"column"}>
                    <NumberInput allowMouseWheel>
                      <NumberInputField
                        placeholder={t(
                          "add-funds.modal.number-input-placeholder"
                        )}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Button colorScheme="blue" width="100%" marginTop="10%">
                      {t("add-funds.modal.add-button")}
                    </Button>
                    {/* </Flex> */}
                    {/* <BallanceCard /> */}
                  </Flex>
                </ModalBody>
              </ModalContent>
            </Modal>
          </SimpleGrid>
        </Container>
      </Center>
    </Fragment>
  );
};
