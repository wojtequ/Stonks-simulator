import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { DEBOUNCE_TIMEOUT } from "./constants";
import { setJwtToken } from "./utils";

type RegisterModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  onSave: VoidFunction;
};

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const loginRegExp = /.{5,}/;
  const passwordRegExp =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const toast = useToast();
  const passwordRulesList = useMemo(
    () => (
      <Fragment>
        Password should meet this conditions:
        <UnorderedList>
          <ListItem>at least one upper case letter</ListItem>
          <ListItem>at least one lower case letter</ListItem>
          <ListItem>at least one digit</ListItem>
          <ListItem>at least one special character</ListItem>
          <ListItem>minimum 8 characters</ListItem>
        </UnorderedList>
      </Fragment>
    ),
    []
  );

  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("");
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  useEffect(() => {
    userNameError || passwordError
      ? setIsFormValid(false)
      : setIsFormValid(true);
  }, [userNameError, passwordError]);

  const isUserNameValid = (userName: string) => loginRegExp.test(userName);
  const isPasswordValid = (password: string) => passwordRegExp.test(password);

  const handleUserNameChange = debounce((userName: string) => {
    setUserName(userName);
    isUserNameValid(userName)
      ? setUserNameError(false)
      : setUserNameError(true);
  }, DEBOUNCE_TIMEOUT);

  const handlePasswordChange = debounce((password: string) => {
    setPassword(password);
    isPasswordValid(password)
      ? setPasswordError(false)
      : setPasswordError(true);
  }, DEBOUNCE_TIMEOUT);

  const handleSave = () => {
    if (!isUserNameValid(userName) || !isPasswordValid(password)) {
      !isUserNameValid(userName) && setUserNameError(true);
      !isPasswordValid(password) && setPasswordError(true);
      return;
    }

    fetch("http://localhost:3000/api/register", {
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
          title: "Registration succesfully",
          description: "You are logged in, you will be redirected to home page in a few seconds",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.reload();
        },5000);
        handleClose();
      })
      .catch((response) => {
        response.json().then((json: { message: string }) => {
          if (json.message === "user already exists") {
            setUserNameError(true);
            toast({
              title: "User already exists",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
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
    setPassword("");
    setPasswordError(false);
    setIsPasswordVisible(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
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
              {passwordError && (
                <Tooltip hasArrow label={passwordRulesList} fontSize="md">
                  <InfoOutlineIcon color={"Highlight"} />
                </Tooltip>
              )}
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
            Create Account
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
