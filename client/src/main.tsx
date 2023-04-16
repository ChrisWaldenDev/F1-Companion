import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  BrowserRouter, Route,
  Routes
} from 'react-router-dom'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { ThemeProvider } from '@mui/material'
import theme from './assets/theme.tsx'

import DriverList from './components/DriverList/DriverList.tsx'
import ConstructorList from './components/ConstructorList/ConstructorList.tsx'
import RaceList from './components/RaceList/RaceList.tsx'
import Header from './components/Header/Header.tsx'
import PageNotFound from './components/PageNotFound/PageNotFound.tsx'

const rootElement = document.getElementById('root')

if (rootElement != null) {
  ReactDOM.createRoot(rootElement).render(
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
    </React.StrictMode>
  )
} else {
  console.error('Could not find root element')
}
