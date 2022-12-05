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
  Input,
  SimpleGrid,
  LightMode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { t } from "../translations/utils";
import { AddBallanceCard } from "./AddBallanceCard";

type TransactionModalProps = {
  isOpened: boolean;
  balance: number;
  auctions: number;
  onClose: VoidFunction;
  onSubmit: VoidFunction;
};

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpened,
  balance,
  auctions,
  onClose,
  onSubmit,
}) => {
  const balanceAfterTransaction = balance - auctions;

  const handleClose = () => {
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
                <Input
                  _placeholder={{ color: "black", fontWeight: "bold" }}
                  type="text"
                  placeholder={`Are you sure to transfer ${String(auctions)}$?`}
                  disabled={true}
                />
                <Button
                  colorScheme="blue"
                  width="100%"
                  marginTop="10%"
                  onClick={() => {
                    onSubmit();
                    onClose();
                  }}
                >
                  {t("add-funds.modal.add-button")}
                </Button>
              </Flex>
            </Box>
            <AddBallanceCard
              ballance={balance}
              newBallance={balanceAfterTransaction}
            />
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
