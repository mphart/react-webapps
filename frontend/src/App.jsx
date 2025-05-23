import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import applist from './webapps/applist.json'
import './styles/App.css'

// webapps
import Calculator from './webapps/calculator/Calculator.jsx' 
import TicTacToe from './webapps/tic-tac-toe/TicTacToe.jsx'

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="calculator" element={<Calculator />} />
        <Route path="tic-tac-toe" element={<TicTacToe />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export function SearchPage(){
  const [filtered, setFiltered] = useState(applist)

  function handleChange(e){
    let searchTerm = e.target.value.toLowerCase().trim()
    let newList = applist.filter(app => app.title.toLowerCase().includes(searchTerm))
    setFiltered(newList)
  }

  return (
    <>
      <h1>Webapps ({filtered.length})</h1>
      <input type="text" onChange={handleChange} className="search-field"/>
      <div className="gallery">
        {filtered.map(app => {
          return(
            <div className="card" key={app.title}>
              <h1 className="card-title">{app.title}</h1>
              <h2 className="card-text">{app.description}</h2>
              <Link to={app.path}><button>View</button></Link>
              <button className="favorite">Like</button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export function NotFoundPage(){
  return(
    <h1>404: Not Found</h1>
  )
}