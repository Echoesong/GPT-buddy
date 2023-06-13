import { Link } from "react-router-dom"

function Nav(){

    return (
      <header className="mb-2">
      <div className="navbar flex justify-between bg-slate-700 border-r-2">
        <div className="flex">
          <Link to="/">
            <div className="btn btn-ghost normal-case txt-xl">Home</div>
          </Link>
          
        </div>
      </div>
    </header>
    );
    
}

export default function Header(props){
    return (
        <div className='Header'>
            <Nav/>
            
        </div>
    )
}