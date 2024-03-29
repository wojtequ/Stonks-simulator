import React from "react";
import { t } from "../../translations/utils";
import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerBody,
  DrawerContent,
  VStack,
  Icon,
  Text,
  Spacer,
  Center,
  Highlight,
} from "@chakra-ui/react";
import { BsWallet2 } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { TbArrowsDownUp } from "react-icons/tb";
import { HiOutlineUser } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { DarkModeToggle } from "../DarkModeToggle";
import { LanguageSelect } from "../../translations/LanguageSelect";
import "./Navigation.css";

type NavbarProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  variant: "drawer" | "sidebar";
};

type SideBarContentProps = {
  onClick: VoidFunction;
};

const activeLinkClassName = "active";
const NAVBAR_ICON_CLASS_NAME = "navbar-icon";

const SidebarContent: React.FC<SideBarContentProps> = ({ onClick }) => (
  <VStack align="">
    <Box mb={16} p={5}>
      <Text fontSize="xl" fontWeight="bold" color="blue.400">
        <Icon as={BsWallet2} w={10} h={10} />
        <Highlight query="Simulator" styles={{ py: "1", color: "red" }}>
          StonksSimulator
        </Highlight>
      </Text>
    </Box>
    <NavLink
      to="/homepage"
      id="navlink"
      className={({ isActive }) => (isActive ? activeLinkClassName : undefined)}
      onClick={onClick}
    >
      <Icon
        className={NAVBAR_ICON_CLASS_NAME}
        as={AiOutlineHome}
        w={7}
        h={7}
        mr={4}
      />
      {t("home-page")}
    </NavLink>
    <NavLink
      to="/transactions"
      id="navlink"
      className={({ isActive }) => (isActive ? activeLinkClassName : undefined)}
      onClick={onClick}
    >
      <Icon
        className={NAVBAR_ICON_CLASS_NAME}
        as={TbArrowsDownUp}
        w={6}
        h={6}
        mr={3}
      />{" "}
      {t("transactions")}
    </NavLink>
    <NavLink
      to="/details"
      id="navlink"
      className={({ isActive }) => (isActive ? activeLinkClassName : undefined)}
      onClick={onClick}
    >
      <Icon
        className={NAVBAR_ICON_CLASS_NAME}
        as={BsWallet2}
        w={6}
        h={6}
        mr={3}
      />{" "}
      {t("details")}
    </NavLink>
    <NavLink
      to="/profile"
      id="navlink"
      className={({ isActive }) => (isActive ? activeLinkClassName : undefined)}
      onClick={onClick}
    >
      <Icon
        className={NAVBAR_ICON_CLASS_NAME}
        as={HiOutlineUser}
        w={6}
        h={6}
        mr={3}
      />{" "}
      {t("profile")}
    </NavLink>
    <Box display="flex" p={5}>
      <Center>
        <DarkModeToggle />
      </Center>
      <Spacer />
      <LanguageSelect />
    </Box>
  </VStack>
);

export const Sidebar: React.FC<NavbarProps> = ({
  isOpen,
  onClose,
  variant,
}) => {
  return variant === "sidebar" ? (
    <Box
      position="fixed"
      left={0}
      w="300px"
      top={0}
      h="100%"
      boxShadow="dark-lg"
      className="type-sidebar"
    >
      <SidebarContent
        onClick={() => {
          onClose();
        }}
      />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
      <DrawerOverlay className="type-drawer">
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <SidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
