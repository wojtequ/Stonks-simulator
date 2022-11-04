import React, { Fragment, useState } from "react";
import {
  Button,
  Center,
  Text,
  VStack,
  Highlight,
  Image,
  Box,
  ButtonGroup,
} from "@chakra-ui/react";
import { LoginModal } from "./authorization/LoginModal";
import { RegisterModal } from "./authorization/RegisterModal";

export const LandingPage = () => {
  const [isRegisterModalOpened, setIsRegisterModalOpened] =
    useState<boolean>(false);

  const handleRegisterClose = () => {
    setIsRegisterModalOpened(false);
  };

  const [isLoginModalOpened, setIsLoginModalOpened] = useState<boolean>(false);

  const handleLoginClose = () => {
    setIsLoginModalOpened(false);
  };

  return (
    <Fragment>
      <Center mt={10}>
        <VStack>
          <Text fontSize="4xl" fontWeight="bold" color="green">
            <Highlight query="Simulator" styles={{ py: "1", color: "red" }}>
              StonksSimulator
            </Highlight>
          </Text>
          <Box>
            <Image
              src="https://media.tenor.com/5ety3Lx3QccAAAAC/its-fine-dog-fine.gif"
              alt="its fine dog"
              borderRadius="full"
              boxSize="250px"
            />
          </Box>
          <Text fontSize="2xl">Stock market investment simulator</Text>
          <div>
            <Fragment>
              <ButtonGroup gap="2">
                <Button onClick={() => setIsRegisterModalOpened(true)}>
                  Register
                </Button>
                <Button
                  colorScheme="green"
                  onClick={() => setIsLoginModalOpened(true)}
                >
                  Login
                </Button>
              </ButtonGroup>
              <RegisterModal
                isOpen={isRegisterModalOpened}
                onClose={handleRegisterClose}
                onSave={handleRegisterClose}
              />
              <LoginModal
                isOpen={isLoginModalOpened}
                onClose={handleLoginClose}
                onSave={handleLoginClose}
              />
            </Fragment>
          </div>
          <Box pr={150} opacity="0.4">
            <Image
              src="https://compote.slate.com/images/926e5009-c10a-48fe-b90e-fa0760f82fcd.png?crop=680%2C453%2Cx0%2Cy0&width=1280"
              borderRadius="2xl"
              alt="stonks image"
              boxSize="350px"
            />
          </Box>
          <Box pl={150} opacity="0.4">
            <Image
              src="https://a.pinatafarm.com/960x576/712b5163f7/not-stonks.jpg"
              borderRadius="2xl"
              alt="not stonks image"
              boxSize="350px"
            />
          </Box>
        </VStack>
      </Center>
    </Fragment>
  );
};
