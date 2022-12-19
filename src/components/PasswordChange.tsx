import { Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Checkbox, Box, ListItem, UnorderedList, useToast } from '@chakra-ui/react'
import { debounce } from 'lodash';
import { Fragment, useEffect, useMemo, useState } from 'react'
import { t } from '../translations/utils';
import { passwordRegExp, DEBOUNCE_TIMEOUT } from './authorization/constants';
import { getJwtToken } from './authorization/utils';
import { ErrorInfo } from './ErrorInfo'

export const PasswordChange = () => {
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
    const toast = useToast();

    const [newPasswordError, setNewPasswordError] = useState<boolean>(false);
    const [isPasswordFormValid, setIsPasswordFormValid] = useState<boolean>(true);
    const [actualPassword, setActualPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isPasswordConfirmationTrue, setIsPasswordConfirmationTrue] = useState<boolean>(false);

    const isPasswordValid = (password: string) => passwordRegExp.test(password);

    useEffect(() => {
        !actualPassword || !newPassword || !isPasswordConfirmationTrue || newPasswordError ? setIsPasswordFormValid(false) : setIsPasswordFormValid(true)
    }, [actualPassword, newPasswordError, newPassword, isPasswordConfirmationTrue])

    const handlePasswordChange = debounce((password: string) => {
        setNewPassword(password);
        isPasswordValid(password) ? setNewPasswordError(false) : setNewPasswordError(true);
    }, DEBOUNCE_TIMEOUT);

    const resetForm = () => {
        setActualPassword("");
        setNewPassword("");
        setIsPasswordConfirmationTrue(false);
    }


    const handleSave = () => {
        fetch("http://localhost:3000/api/changePassword", {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${getJwtToken()}`,
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                password: actualPassword,
                newPassword: newPassword
            }),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
            .then(() => {
                resetForm();
                toast({
                    title: t("profile-password-changed"),
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
            })
            .catch((response) => {
                response.json().then((json: { message: string }) => {
                    if (json.message === "Wrong old password") {
                        toast({
                            title: t("profile-password-wrong.actual"),
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                        })
                    }
                    if (json.message === "New password cannot be the same as old password") {
                        toast({
                            title: t("profile-password-same"),
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
                        {t("new.password")}{" "}
                        {newPasswordError && <ErrorInfo label={passwordRulesList} />}
                    </FormLabel>
                    <InputGroup>
                        <Input type={isPasswordVisible ? "text" : "password"} placeholder="********" size='md' onChange={(e) => handlePasswordChange(e.target.value)} />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                                {isPasswordVisible ? t("password-hide") : t("password-show")}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Checkbox colorScheme="green" isChecked={isPasswordConfirmationTrue} onChange={(e) => setIsPasswordConfirmationTrue(e.target.checked)}>
                    {t("profile-confirmation")}
                </Checkbox>
                <Button colorScheme="blue" size="sm" mt={4} disabled={!isPasswordFormValid} onClick={handleSave}>{t("profile-change-password")}</Button>
            </Flex>
        </Box>
    )
}
