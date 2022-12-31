import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
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
                  _placeholder={{ color: "gray", fontWeight: "bold" }}
                  type="text"
                  placeholder={`Are you sure to transfer ${String(auctions)}$?`}
                  disabled={true}
                />
                <ButtonGroup justifyContent={"center"} mt="20px">
                  <Button
                    size="lg"
                    colorScheme={"whatsapp"}
                    onClick={() => {
                      onSubmit();
                      onClose();
                    }}
                  >
                    Ok
                  </Button>
                  <Button
                    size="lg"
                    colorScheme={"red"}
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
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
