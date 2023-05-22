import { Link } from "react-router-dom"

function Nav(){

    return (
      <nav className="flex basis-0 flex-row-reverse bg-gray-800 text-white shadow-lg px-1">
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
            <Nav/>
            
        </div>
    )
}