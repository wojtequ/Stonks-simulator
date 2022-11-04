import React from "react";
import {Switch, useColorMode} from "@chakra-ui/react";
import {debounce} from 'lodash'

export const DarkModeToggle = () => {
    const {colorMode, toggleColorMode} = useColorMode()
    const handleColorModeChange = debounce(() =>
            toggleColorMode()
        , 100);

    return (
        <Switch onChange={handleColorModeChange}> {colorMode === 'light' ? 'Dark' : 'Light'} mode</Switch>
    )
}

//check if switch isChecked, because it is not working properly when refreshing website(gets isChecked=false)