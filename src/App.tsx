import React, {Fragment} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import "./App.css";
import {HomePage} from "./components/HomePage";
import {LandingPage} from "./components/LandingPage";
import {DarkModeToggle} from "./components/DarkModeToggle";
import {getJwtToken} from "./components/authorization/utils";

function App() {
    const user = getJwtToken();
    console.log(user);

    let routes;
    if (user) {
        routes =
            (
                <Routes>
                    <Route path="/homepage" element={<HomePage/>}/>
                    <Route path="*" element={<Navigate to="/homepage"/>}/>
                </Routes>
            )
    } else {
        routes =
            (
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            )
    }

    return (
        <Fragment>
            <DarkModeToggle/>
            {routes}
        </Fragment>
    );
}

export default App;
