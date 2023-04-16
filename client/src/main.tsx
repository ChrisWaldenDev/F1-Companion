import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {
    BrowserRouter, Route,
    Routes
} from "react-router-dom";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {ThemeProvider} from "@mui/material";
import theme from './assets/theme';
import DriverList from "./components/DriverList/DriverList";
import ConstructorList from "./components/ConstructorList/ConstructorList";
import RaceList from "./components/RaceList/RaceList";
import Header from "./components/Header/Header";
import PageNotFound from "./components/PageNotFound/PageNotFound";

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="drivers" element={<DriverList/>}/>
                    <Route path="constructors" element={<ConstructorList/>}/>
                    <Route path="schedule" element={<RaceList/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
