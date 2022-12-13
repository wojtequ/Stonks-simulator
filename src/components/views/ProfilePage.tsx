import { Fragment, useState } from "react";
import { Box, Button, Checkbox, Flex, Input, LightMode } from "@chakra-ui/react";
import { getUserNameFromSessionStorage } from "../authorization/utils";

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
            <LightMode>
                <Flex gap={5} minH={"216px"} flexWrap="wrap">
                    <Box borderRadius="15px" maxW='sm' background="white" p={5} boxShadow="dark-lg">
                        <Flex>
                            <Input placeholder={`${getUserNameFromSessionStorage()}`} size='md' disabled />
                            <Button variant="link" fontWeight="light" onClick={() => handleUsernameChangeClick()} ml={2}>Change</Button>
                        </Flex>
                        <Flex mt={2}>
                            <Input placeholder="**********" size='md' disabled />
                            <Button variant="link" fontWeight="light" onClick={() => handlePasswordChangeClick()} ml={2}>Change</Button>
                        </Flex>
                    </Box>
                    {isPasswordChangeShown && (<Box borderRadius="15px" maxW='sm' background="white" p={5} boxShadow="dark-lg">
                        <Flex flexDirection="column" alignItems="center" gap={2}>
                            <Input type="password" placeholder="Current password" size='md' />
                            <Input type="password" placeholder="New password" size='md' />
                            <Checkbox colorScheme="green">
                                Are you sure?
                            </Checkbox>
                            <Button colorScheme="blue" size="sm" mt={4}>Change password</Button>
                        </Flex>
                    </Box>
                    ) || isUsernameChangeShown && (<Box borderRadius="15px" maxW='sm' background="white" p={5} boxShadow="dark-lg">
                        <Flex flexDirection="column" alignItems="center" gap={2}>
                            <Input type="password" placeholder="Current password" size='md' />
                            <Input placeholder="New username" size='md' />
                            <Checkbox colorScheme="green">
                                Are you sure?
                            </Checkbox>
                            <Button colorScheme="blue" size="sm" mt={4}>Change username</Button>
                        </Flex>
                    </Box>)}

                </Flex>
            </LightMode>
        </Fragment>
    )
}