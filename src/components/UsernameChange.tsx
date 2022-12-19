import { Flex, Input, Checkbox, Button, Box, FormControl, FormLabel, useToast } from '@chakra-ui/react'
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { t } from '../translations/utils'
import { DEBOUNCE_TIMEOUT, loginRegExp } from './authorization/constants';
import { getJwtToken, removeJwtToken, setJwtToken, setUserNameInSessionStorage } from './authorization/utils';
import { ErrorInfo } from './ErrorInfo';

export const UsernameChange = () => {
    const toast = useToast();

    const [actualPassword, setActualPassword] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [isUserNameConfirmationTrue, setIsUserNameConfirmationTrue] = useState<boolean>(false);
    const [userNameError, setUserNameError] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(true);
    const [userNameInput, setUserNameInput] = useState<string>("");

    const isUserNameValid = (userName: string) => loginRegExp.test(userName);

    useEffect(() => {
        !actualPassword || !userName || !isUserNameConfirmationTrue || !isUserNameValid(userName) ? setIsFormValid(false) : setIsFormValid(true)
    })

    const handleUserNameChange = debounce((userName: string) => {
        setUserName(userName);
        isUserNameValid(userName) ? setUserNameError(false) : setUserNameError(true);
    }, DEBOUNCE_TIMEOUT)

    const resetForm = () => {
        setActualPassword("");
        setUserNameInput("");
        setUserName("");
        setIsUserNameConfirmationTrue(false);
    }

    const handleSave = () => {
        fetch("http://localhost:3000/api/changeUsername", {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${getJwtToken()}`,
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                password: actualPassword,
                newUsername: userName
            }),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
            .then((json) => {
                console.log(json)
                setUserNameInSessionStorage(json.userName)
                setJwtToken(json.Newtoken)
                resetForm();
                toast({
                    title: t("profile-username-changed"),
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
            })
            .catch((response) => {
                response.json().then((json: { message: string }) => {
                    if (json.message === "Old username can't be new username") {
                        toast({
                            title: t("profile-username-same"),
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                        })
                    }
                    if (json.message === "Wrong password") {
                        toast({
                            title: t("login.modal.password-error"),
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                        })
                    }
                    if (json.message === "this username already exists") {
                        toast({
                            title: t("toast.registration.title.error"),
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                        })
                    }
                })
            })
    }

    return (
        <Box borderRadius="15px" maxW='sm' p={5} boxShadow="dark-lg">
            <Flex flexDirection="column" alignItems="center" gap={2}>
                <FormControl>
                    <FormLabel>{t("current.password")}</FormLabel>
                    <Input type="password" placeholder="********" size='md' value={actualPassword} onChange={(e) => setActualPassword(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>
                        {t("new.username")}{" "}
                        {userNameError && (<ErrorInfo label={t("register.modal.username-error")} />)}
                    </FormLabel>
                    <Input type="text" placeholder={t("user-name")} size='md' value={userNameInput} onChange={(e) => { handleUserNameChange(e.target.value); setUserNameInput(e.target.value) }} />
                </FormControl>
                <Checkbox colorScheme="green" isChecked={isUserNameConfirmationTrue} onChange={(e) => setIsUserNameConfirmationTrue(e.target.checked)}>
                    {t("profile-confirmation")}
                </Checkbox>
                <Button colorScheme="blue" size="sm" disabled={!isFormValid} onClick={handleSave} mt={4}>{t("profile-change-username")}</Button>
            </Flex>
        </Box>
    )
}
