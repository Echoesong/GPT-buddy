import { Link } from "react-router-dom";

function Nav() {
  return (
    <header className="mb-2">
      <div className="navbar flex justify-between border-r-2 bg-gray-800">
        <div className="flex">
          <Link to="/">
            <div className="btn btn-outline normal-case txt-xl mx-1 ">Home</div>
          </Link>
          <Link to="/about">
            <div className="btn btn-outline normal-case txt-xl mx-1 ">
              About
            </div>
          </Link>
          <Link to="/summarize">
            <div className="btn btn-outline normal-case txt-xl mx-1 ">
              Summarize
            </div>
          </Link>
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
