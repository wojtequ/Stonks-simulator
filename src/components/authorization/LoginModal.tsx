import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { DEBOUNCE_TIMEOUT } from "./constants";

type LoginModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  onSave: VoidFunction;
};

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const username_check = "admin";
  const password_check = "Admin123!";

  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  useEffect(() => {
    error ? setIsFormValid(false) : setIsFormValid(true);
  }, [error]);

  const handleUserNameChange = debounce((userName: string) => {
    setUserName(userName);
    setError(false);
  }, DEBOUNCE_TIMEOUT);

  const handlePasswordChange = debounce((password: string) => {
    setPassword(password);
    setError(false);
  }, DEBOUNCE_TIMEOUT);

  const toast = useToast();
  const handleSave = () => {
    if (userName !== username_check || password !== password_check) {
      setError(true);
      toast({
        title: "Incorrect password or username",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const a = { userName, password };
    console.log(a);
    toast({
      title: "Login successful",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    handleClose();
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  const reset = () => {
    setIsFormValid(true);
    setUserName("");
    setError(false);
    setPassword("");
    setIsPasswordVisible(false);
  };
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in to your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>User Name</FormLabel>
            <Input
              placeholder="User Name"
              isInvalid={error}
              onChange={(e) => handleUserNameChange(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              Password{" "}
              {error && (
                <Tooltip
                  hasArrow
                  label="Incorrect password or username"
                  fontSize="md"
                >
                  <InfoOutlineIcon color={"Red"} />
                </Tooltip>
              )}
            </FormLabel>
            <InputGroup>
              <Input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter password"
                isInvalid={error}
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter style={{ justifyContent: "center" }}>
          <Button
            colorScheme="blue"
            onClick={handleSave}
            disabled={!isFormValid}
            style={{ width: "100%" }}
          >
            Log in
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
