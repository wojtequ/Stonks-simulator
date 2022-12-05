import { IconButton } from "@chakra-ui/button";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/popover";
import { Tooltip } from "@chakra-ui/tooltip";
import React from "react";
import { isMobile } from "./authorization/utils";

type ErrorInfoProps = {
  label?: string | JSX.Element;
  iconColor?: string;
};

export const ErrorInfo: React.FC<ErrorInfoProps> = ({
  label = "",
  iconColor = "Red",
}) => {
  if (isMobile()) {
    return (
      <Popover>
        <PopoverTrigger>
          <IconButton
            aria-label="error info"
            icon={<InfoOutlineIcon color={iconColor} />}
            variant="ghost"
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody style={{ paddingRight: "40px" }}>{label}</PopoverBody>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Tooltip hasArrow label={label} fontSize="md">
      <InfoOutlineIcon color={iconColor} />
    </Tooltip>
  );
};
