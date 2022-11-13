import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { getJwtToken } from "./components/authorization/utils";
import { HomePage } from "./components/views/HomePage";
import { LandingPage } from "./components/views/LandingPage";
import { Transactions } from "./components/views/Transactions";
import { Sidebar } from "./components/navigation/Sidebar";
import { LanguageContext } from "./contexts/LanguageContext";
import { getActiveLanguage, Language } from "./translations/utils";
import {Box, useBreakpointValue} from "@chakra-ui/react";
import {Header} from "./components/navigation/Header";

const smVariant = {navigation: 'drawer', navigationButton: true}
const mdVariant = {navigation: 'sidebar', navigationButton: false}

function App() {
  const user = getJwtToken();

    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const variants = useBreakpointValue({ base: smVariant, md: mdVariant }) ?? smVariant
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

  const [activeLanguage, setActiveLanguage] = useState<Language>(
    getActiveLanguage()
  );

  let routes;
    routes = user ? (
        <Box ml={!variants?.navigationButton ? 300 : 0}>
        <Sidebar
            variant={variants?.navigation as 'drawer' | 'sidebar'}
            isOpen={isSidebarOpen}
            onClose={toggleSidebar}
        />
            <Box>
                <Header
                    showSidebarButton={variants?.navigationButton as boolean}
                    onShowSidebar={toggleSidebar}
                />
            </Box>
        <Routes>
            <Route path="/homepage" element={<HomePage/>}/>
            <Route path="/transactions" element={<Transactions/>}/>
            <Route path="*" element={<Navigate to="/homepage"/>}/>
        </Routes>

        </Box>
    ) : (
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );

    return (
    <LanguageContext.Provider value={{ activeLanguage, setActiveLanguage }}>
      {routes}
    </LanguageContext.Provider>
  );
}

export default App;
