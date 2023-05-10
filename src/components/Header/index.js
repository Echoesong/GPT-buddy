import { Link } from "react-router-dom"

function Nav(){

    return(
        <nav className='nav'>
            <Link to='/'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt=''/>
            </Link>
        <div>People App</div>
    </nav>
    )
    
}

export default function Header(props){
    return (
        <div className='Header'>
            <h1>Header Component</h1>
            <Nav/>
            
        </div>
    )
}