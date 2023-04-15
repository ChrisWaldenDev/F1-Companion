import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
    BrowserRouter, Route,
    Routes
} from "react-router-dom";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {ThemeProvider} from "@mui/material";
import theme from './assets/theme.jsx';
import DriverList from "./components/DriverList/DriverList.jsx";
import ConstructorList from "./components/ConstructorList/ConstructorList.jsx";
import RaceList from "./components/RaceList/RaceList.jsx";
import Header from "./components/Header/Header.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="drivers" element={<DriverList/>}/>
                    <Route path="constructors" element={<ConstructorList/>}/>
                    <Route path="schedule" element={<RaceList/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
)
