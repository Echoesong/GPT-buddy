import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Auth0/login";
import LogoutButton from "../Auth0/logout"; 

function Nav() {
  const { isAuthenticated } = useAuth0();

  return (
    <header className="mb-2">
      <div className="navbar flex justify-between border-r-2 bg-gray-800">
        <div className="flex">
          <Link to="/">
            <div className="btn btn-primary normal-case txt-xl mx-1 ">Home</div>
          </Link>
          <Link to="/about">
            <div className="btn btn-primary normal-case txt-xl mx-1 ">
              About
            </div>
          </Link>
        </div>
        <div className="btn btn-primary normal-caste txt-xl mx-1 flex flex-row-reverse">
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
      </div>
    </header>
  );
}

export default function Header(props) {
  return (
    <div className="Header">
      <Nav />
    </div>
  );
}
