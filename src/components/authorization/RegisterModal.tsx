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
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { t } from "../../translations/utils";
import { ErrorInfo } from "../ErrorInfo";
import { VIEW_REDIRECT_TIMEOUT } from "../views/constants";
import { DEBOUNCE_TIMEOUT } from "./constants";
import { setJwtToken, setUserNameInSessionStorage } from "./utils";

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
        {t("register.modal.password-rules.title")}
        <UnorderedList>
          <ListItem>
            {t("register.modal.password-rules.upper-case-letter")}
          </ListItem>
          <ListItem>
            {t("register.modal.password-rules.lower-case-letter")}
          </ListItem>
          <ListItem>{t("register.modal.password-rules.digit")}</ListItem>
          <ListItem>
            {t("register.modal.password-rules.special-character")}
          </ListItem>
          <ListItem>
            {t("register.modal.password-rules.min-characters")}
          </ListItem>
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
        setUserNameInSessionStorage(json.userName);
        setJwtToken(json.token);
        toast({
          title: t("toast.registration.title.success"),
          description: t("toast.login-success-description"),
          status: "success",
          duration: VIEW_REDIRECT_TIMEOUT,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.reload();
        }, VIEW_REDIRECT_TIMEOUT);
        handleClose();
      })
      .catch((response) => {
        response.json().then((json: { message: string }) => {
          if (json.message === "user already exists") {
            setUserNameError(true);
            toast({
              title: t("toast.registration.title.error"),
              status: "error",
              duration: VIEW_REDIRECT_TIMEOUT,
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
        <ModalHeader>{t("register.modal.title")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>
              {t("user-name")}{" "}
              {userNameError && (
                <ErrorInfo label={t("register.modal.username-error")} />
              )}
            </FormLabel>
            <Input
              placeholder={t("user-name")}
              isInvalid={userNameError}
              onChange={(e) => handleUserNameChange(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              {t("password")}{" "}
              {passwordError && <ErrorInfo label={passwordRulesList} />}
            </FormLabel>
            <InputGroup>
              <Input
                type={isPasswordVisible ? "text" : "password"}
                placeholder={t("password-placeholder")}
                isInvalid={passwordError}
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? t("password-hide") : t("password-show")}
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
            {t("register.modal.create-account")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
