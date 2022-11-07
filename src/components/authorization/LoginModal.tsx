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
  useToast,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { ErrorInfo } from "../ErrorInfo";
import { DEBOUNCE_TIMEOUT } from "./constants";
import { setJwtToken } from "./utils";

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
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("");
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  useEffect(() => {
    userNameError || passwordError
      ? setIsFormValid(false)
      : setIsFormValid(true);
  }, [userNameError, passwordError]);

  const handleUserNameChange = debounce((userName: string) => {
    setUserName(userName);
    setUserNameError(false);
  }, DEBOUNCE_TIMEOUT);

  const handlePasswordChange = debounce((password: string) => {
    setPassword(password);
    setPasswordError(false);
  }, DEBOUNCE_TIMEOUT);

  const toast = useToast();

  const handleSave = () => {
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((json) => {
        setJwtToken(json.token);
        toast({
          title: "Login succesfully",
          description:
            "You are logged in, you will be redirected to home page in a few seconds",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.reload();
        }, 5000);
        handleClose();
      })
      .catch((response) => {
        response.json().then((json: { message: string }) => {
          if (json.message === "User not found") {
            setUserNameError(true);
          } else if (json.message === "Wrong password") {
            setPasswordError(true);
          }

          toast({
            title: "Login failed",
            description: json.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
      });
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  const reset = () => {
    setIsFormValid(true);
    setUserName("");
    setUserNameError(false);
    setPasswordError(false);
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
              isInvalid={userNameError}
              onChange={(e) => handleUserNameChange(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              Password{" "}
              {passwordError && <ErrorInfo label="Incorrect password" />}
            </FormLabel>
            <InputGroup>
              <Input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter password"
                isInvalid={passwordError}
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
