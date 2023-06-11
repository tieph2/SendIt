import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { LoginButton } from "@/Components/LoginButton.tsx";
import { LogoutButton } from "@/Components/LogoutButton.tsx";

export function NavBar() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <nav className={"navbar justify-center rounded-b flex flex-col"}>
      <div className={"navbar-center lg:flex"}>

        <ul className={"menu menu-horizontal justify-center m-0"}>
          <li><Link to="/boulders"> Boulders</Link> </li>

          {
            user?.["https://my-app.example.com/roles"][0] === "Judge"
            ?
              <>
                <li><Link to="/judge"> Judge </Link> </li>
                <li><Link to="/boulders/create"> Create Boulder</Link> </li>
              </>
            :
              <li><Link to="/profile/edit"> Competition signup</Link> </li>
          }
          {
            isAuthenticated
            ?
              <>
                <li>
                  <div className={"avatar-sm"}
                       style={{
                         backgroundImage: `url(${user.picture}`,

                  }}></div>
                  <LogoutButton/></li>
              </>
            :
            <li><LoginButton/></li>
          }

        </ul>
      </div>
    </nav>

  );
}
