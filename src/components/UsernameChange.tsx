import { Flex, Input, Checkbox, Button, Box, FormControl, FormLabel } from '@chakra-ui/react'
import { useState } from 'react';
import { t } from '../translations/utils'

export const UsernameChange = () => {

    const [actualPassword, setActualPassword] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [isUsernameConfirmationTrue, setIsUsernameConfirmationTrue] = useState<boolean>(false);

    return (
        <Box borderRadius="15px" maxW='sm' p={5} boxShadow="dark-lg">
            <Flex flexDirection="column" alignItems="center" gap={2}>
                <FormControl>
                    <FormLabel>{t("current.password")}</FormLabel>
                    <Input type="password" placeholder="********" size='md' value={actualPassword} onChange={(e) => setActualPassword(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>
                        {t("new.username")}
                    </FormLabel>
                    <Input type="text" placeholder={t("user-name")} size='md' onChange={(e) => setUserName(e.target.value)} />
                </FormControl>
                <Checkbox colorScheme="green" isChecked={isUsernameConfirmationTrue} onChange={(e) => setIsUsernameConfirmationTrue(e.target.checked)}>
                    {t("profile-confirmation")}
                </Checkbox>
                <Button colorScheme="blue" size="sm" mt={4}>{t("profile-change-username")}</Button>
            </Flex>
        </Box>
    )
}
