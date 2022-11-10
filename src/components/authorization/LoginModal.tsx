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
import { t } from "../../translations/utils";
import { ErrorInfo } from "../ErrorInfo";
import { VIEW_REDIRECT_TIMEOUT } from "../views/constants";
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
          title: t("toast.login.title.success"),
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
          if (json.message === "User not found") {
            setUserNameError(true);
          } else if (json.message === "Wrong password") {
            setPasswordError(true);
          }

          toast({
            title: t("toast.login.title.error"),
            description: json.message,
            status: "error",
            duration: VIEW_REDIRECT_TIMEOUT,
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
        <ModalHeader>{t("login.modal.title")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>{t("user-name")}</FormLabel>
            <Input
              placeholder={t("user-name")}
              isInvalid={userNameError}
              onChange={(e) => handleUserNameChange(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              {t("password")}{" "}
              {passwordError && (
                <ErrorInfo label={t("login.modal.password-error")} />
              )}
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
            {t("log-in")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
