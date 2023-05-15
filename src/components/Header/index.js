import { Link } from "react-router-dom"

function Nav(){

    return (
      <nav className="bg-gray-800 text-white shadow-lg">
        <Link
          to="/"
          className="bg-gray-300 my-2 inline-block p-2 rounded-full hover:bg-blue-800"
        >
          <p>Home</p>
        </Link>
      </nav>
    );
    
}

export default function Header(props){
    return (
        <div className='Header'>
            <h1>Header Component</h1>
            <Nav/>
            
        </div>
    )
}