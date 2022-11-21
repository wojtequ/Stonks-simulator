import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { t } from "../translations/utils";
import { AddBallanceCard } from "./AddBallanceCard";

type AddFundsModalProps = {
  isOpened: boolean;
  balance: number;
  onClose: VoidFunction;
  onSubmit: (addedFunds: number)=>void
};

export const AddFundsModal: React.FC<AddFundsModalProps> = ({
  isOpened,
  balance,
  onClose,
  onSubmit,
}) => {
  const [newBalance, setNewBalance] = useState<number>(balance);

  useEffect(() => {
    setNewBalance(balance);
  }, [balance]);

  const handleChangeAddFunds = (newValue: number) => {
    const newBalance = Number((balance + newValue).toFixed(2));
    newValue && setNewBalance(newBalance >= 0 ? newBalance : 0);
  };

  const handleClose = () => {
    setNewBalance(balance);
    onClose();
  };

  return (
    <Modal isOpen={isOpened} isCentered onClose={handleClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody padding={"10%"}>
          <SimpleGrid
            minChildWidth="312px"
            columns={2}
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <Box justifySelf="center" maxW="sm" minW="310px">
              <Flex direction={"column"}>
                <NumberInput allowMouseWheel>
                  <NumberInputField
                    placeholder={t("add-funds.modal.number-input-placeholder")}
                    onChange={(e) =>
                      handleChangeAddFunds(Number(e.target.value))
                    }
                  />
                </NumberInput>
                <Button colorScheme="blue" width="100%" marginTop="10%" onClick={()=>{onSubmit(newBalance - balance);onClose()}}>
                  {t("add-funds.modal.add-button")}
                </Button>
              </Flex>
            </Box>
            <AddBallanceCard ballance={balance} newBallance={newBalance} />
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
