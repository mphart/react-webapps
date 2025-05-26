import {useState} from 'react'
import applist from '../webapps/applist.json'
import {Link} from 'react-router-dom'

export default function SearchPage(){
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
