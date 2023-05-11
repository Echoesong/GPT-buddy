import { Link } from "react-router-dom"

function Nav(){

    return(
        <nav className='bg-blue-600 text-white shadow-lg'>
            <Link 
            to='/' 
            className='inline-block p-2 bg-blue-600 rounded-full hover:bg-blue-800'>
                <img className='account-icon w-10 h-10 object-cover rounded-full' 
                src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt=''/>
            </Link>
        <div>Queries</div>
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