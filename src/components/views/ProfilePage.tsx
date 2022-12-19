import { Fragment, useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { getUserNameFromSessionStorage } from "../authorization/utils";
import { PasswordChange } from "../PasswordChange";
import { t } from "../../translations/utils";
import { UsernameChange } from "../UsernameChange";

export const Profile = () => {

    const [isPasswordChangeShown, setIsPasswordChangeShown] = useState<boolean>(false)
    const [isUsernameChangeShown, setIsUsernameChangeShown] = useState<boolean>(false)

    const handlePasswordChangeClick = () => {
        if (isUsernameChangeShown) {
            setIsUsernameChangeShown(false)
        }
        setIsPasswordChangeShown(current => !current)
    }
    const handleUsernameChangeClick = () => {
        if (isPasswordChangeShown) {
            setIsPasswordChangeShown(false)
        }
        setIsUsernameChangeShown(current => !current)
    }

    return (
        <Fragment>
            <Flex gap={5} minH={"280px"} flexWrap="wrap" alignItems="center" ml={5} mt={5}>
                <Box borderRadius="15px" maxW='sm' p={5} boxShadow="dark-lg">
                    <FormControl>
                        <FormLabel>{t("user-name")}</FormLabel>
                        <Flex>
                            <Input placeholder={`${getUserNameFromSessionStorage()}`} disabled />
                            <Button variant="link" fontWeight="light" onClick={() => handleUsernameChangeClick()} ml={2}>{t("change")}</Button>
                        </Flex>
                        <FormLabel>{t("password")}</FormLabel>
                        <Flex mt={2}>
                            <Input placeholder="**********" disabled />
                            <Button variant="link" fontWeight="light" onClick={() => handlePasswordChangeClick()} ml={2}>{t("change")}</Button>
                        </Flex>
                    </FormControl>

                </Box>
                {(isPasswordChangeShown && <PasswordChange />) || (isUsernameChangeShown && <UsernameChange />)}

            </Flex>
        </Fragment >
    )
}