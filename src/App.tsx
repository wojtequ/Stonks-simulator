import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { getJwtToken } from "./components/authorization/utils";
import { HomePage } from "./components/views/HomePage";
import { LandingPage } from "./components/views/LandingPage";
import { LanguageContext } from "./contexts/LanguageContext";
import { getActiveLanguage, Language } from "./translations/utils";

function App() {
  const user = getJwtToken();

  const [activeLanguage, setActiveLanguage] = useState<Language>(
    getActiveLanguage()
  );

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
    <LanguageContext.Provider value={{ activeLanguage, setActiveLanguage }}>
      {routes}
    </LanguageContext.Provider>
  );
}

export default App;
