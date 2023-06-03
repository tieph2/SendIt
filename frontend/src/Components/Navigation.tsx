import { useAuth } from "@/Services/Auth.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { LoginButton } from "@/Components/LoginButton.tsx";
import { LogoutButton } from "@/Components/LogoutButton.tsx";

export function NavBar() {
  const auth = useAuth0();

  return (
    <nav className={"navbar justify-center rounded-b shadow-lg flex flex-col"}>
      <div className={"navbar-center lg:flex"}>

        <ul className={"menu menu-horizontal m-0"}>
          <li><Link to="/boulders"> Boulders</Link> </li>
          <li><Link to="/boulders/create"> Create Boulder</Link> </li>
          <li><Link to="/profile/create"> Signup</Link> </li>
          <li><LoginButton/></li>
          <li><LogoutButton/></li>
        </ul>
      </div>
    </nav>

  );
}
