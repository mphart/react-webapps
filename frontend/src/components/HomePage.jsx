import {Link} from 'react-router-dom'

export default function HomePage(){
    return(
        <>
        <h1>Welcome To mphart's React Portfolio!</h1>
        <p>This is where I host the projects I have been working on. Check it out!</p>
        <Link to="/webapps"><button>Go To Search Page</button></Link>
        </>
    )
}