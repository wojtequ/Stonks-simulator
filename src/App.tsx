import React, { Fragment, useState } from "react";
import { Button, ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import { RegisterModal } from "./components/RegisterModal";

function App() {
  const [isRegisterModalOpened, setIsRegisterModalOpened] =
    useState<boolean>(false);

  const handleRegisterClose = () => {
    setIsRegisterModalOpened(false);
  };

  return (
    <ChakraProvider>
      <Fragment>
        <Button onClick={() => setIsRegisterModalOpened(true)}>Register</Button>
        <RegisterModal
          isOpen={isRegisterModalOpened}
          onClose={handleRegisterClose}
          onSave={handleRegisterClose}
        />
      </Fragment>
    </ChakraProvider>
  );
}

export default App;
