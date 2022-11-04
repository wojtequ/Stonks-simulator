import React, {Fragment} from "react";
import {Link, Route, Routes} from "react-router-dom";
import "./App.css";
import {HomePage} from "./components/HomePage";
import {LandingPage} from "./components/LandingPage";
import {DarkModeToggle} from "./components/DarkModeToggle";

function App() {


    return (
        <Fragment>
            <DarkModeToggle/>
            <Link to="/homepage">HomePage</Link>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/homepage" element={<HomePage/>}/>
            </Routes>
            </Fragment>
    );
}

export default App;
