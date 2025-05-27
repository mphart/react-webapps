import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css'

// home pages
import HomePage from './components/HomePage.jsx'
import NotFoundPage from './components/NotFound.jsx'
import SearchPage from './components/SearchPage.jsx'
import LoginPage from './components/LoginPage.jsx'
import SignupPage from './components/SignupPage.jsx'
// webapps
import Calculator from './webapps/calculator/Calculator.jsx' 
import TicTacToe from './webapps/tic-tac-toe/TicTacToe.jsx'
import WeatherApp from './webapps/weather-app/WeatherApp.jsx'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        <Route path="/webapps">
          <Route index element={<SearchPage/>} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="tic-tac-toe" element={<TicTacToe />} />
          <Route path="weather" element={<WeatherApp />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}