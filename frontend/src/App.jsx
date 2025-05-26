import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import applist from './webapps/applist.json'
import './styles/App.css'

// home pages
import NotFoundPage from './components/NotFound.jsx'
import SearchPage from './components/SearchPage.jsx'
import LoginPage from './components/LoginPage.jsx'
// webapps
import Calculator from './webapps/calculator/Calculator.jsx' 
import TicTacToe from './webapps/tic-tac-toe/TicTacToe.jsx'
import WeatherApp from './webapps/weather-app/WeatherApp.jsx'

export default function App() {
  return (
    <>
    <LoginPage />
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/weather" element={<WeatherApp />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter> */}
    </>
  )
}

