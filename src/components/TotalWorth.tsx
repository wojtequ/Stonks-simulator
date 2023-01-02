import { Box, Text, Highlight } from '@chakra-ui/react'
import { t } from '../translations/utils'

export const TotalWorth: React.FC<{ worth: number }> = ({ worth }) => {
    return (
        <Box backgroundColor="#EFEFEF"
            borderRadius="7px"
            paddingLeft="10px"
            paddingRight="10px"
            borderWidth="3px"
            borderColor="black"
            color="black"
            height="fit-content"
            p={2}
        >
            <Text>
                <Highlight query={t("total-worth")} styles={{ fontWeight: "bold" }}>
                    {`${t("total-worth")}: $${worth}`}
                </Highlight>
            </Text>
        </Box>
    )
}
