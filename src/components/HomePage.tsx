import { Button } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { removeJwtToken } from "./authorization/utils";

export const HomePage = () => {
  const handleLogout = () => {
    removeJwtToken();
    window.location.reload();
  };

  return (
    <Fragment>
      <h1>sample home page</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </Fragment>
  );
};
