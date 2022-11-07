import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { getJwtToken } from "./components/authorization/utils";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { HomePage } from "./components/HomePage";
import { LandingPage } from "./components/LandingPage";

function App() {
  const user = getJwtToken();

  let routes;
  if (user) {
    routes = (
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/homepage" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Fragment>
      <DarkModeToggle />
      {routes}
    </Fragment>
  );
}

export default App;
