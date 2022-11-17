import {
  Button,
  ButtonGroup,
  Center,
  Container,
  Text,
  VStack,
  SimpleGrid,
  Icon
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import { t } from "../../translations/utils";
import { BallanceCard } from "../BallanceCard";
import {TbArrowsDownUp} from "react-icons/tb";
import {AiOutlinePlus} from "react-icons/ai";
import {BsWallet2} from "react-icons/bs";

export const HomePage = () => {

  const ButtonStyle =
      {
        width: '100px',
        height: '73px',
      };

  return (
    <Fragment>
      <Center mt={10}>
        <Container maxW='2xl'>
          <SimpleGrid minChildWidth='312px' columns={2} spacing={4} alignItems="center" justifyContent="center">

            <BallanceCard />
          
            <ButtonGroup justifySelf="center">
              <Button style={ButtonStyle}>
                <VStack>
                  <Text fontSize='sm'>Transfer</Text>
                  <Icon w={6} h={6} as={TbArrowsDownUp}/>
              </VStack>
              </Button>
              <Button style={ButtonStyle}>
                <VStack>
                  <Text fontSize='sm'>{t("add-funds")}</Text>
                  <Icon w={6} h={6} as={AiOutlinePlus}/>
                </VStack>
              </Button>
              <Button style={ButtonStyle}>
                <VStack>
                  <Text fontSize='sm'>{t("details")}</Text>
                  <Icon w={6} h={6} as={BsWallet2}/>
                </VStack>
              </Button>
            </ButtonGroup>
          </SimpleGrid>
        </Container>
      </Center>
    </Fragment>
  );
};
