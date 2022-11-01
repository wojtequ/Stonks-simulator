import React, { Fragment, useEffect, useMemo, useState } from "react";
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
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { debounce } from "lodash";

const DEBOUNCE_TIMEOUT = 500;

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
    const a = { userName, password };
    console.log(a);
    handleClose();
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
