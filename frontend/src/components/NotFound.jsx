import {Link} from 'react-router-dom'

export default function NotFoundPage(){
  return(
    <>
      <h1>404: Not Found</h1>
      <p>Unfortunately, we were unable to find the page you were looking for.</p>
      <Link to="/">Back to Home</Link>
    </>
  )
}