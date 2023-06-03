import { useAuth } from "@/Services/Auth.tsx";
import { Link } from "react-router-dom";

export function NavBar() {
  const auth = useAuth();

  return (
    <nav className={"navbar justify-center bg-white-800 rounded-b shadow-lg mb-4 flex flex-col"}>
      <div className={"navbar-center lg:flex"}>

        <ul className={"menu menu-horizontal"}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login"> Login</Link></li>
          <li><Link to="/logout"> Logout</Link></li>
          <li><Link to="/boulders"> Boulders</Link> </li>
          <li><Link to="/boulders/create"> Boulders</Link> </li>
          <li><Link to="/profile/create"> Signup</Link> </li>
        </ul>
      </div>
    </nav>

  );
}
