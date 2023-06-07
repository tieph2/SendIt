import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { LoginButton } from "@/Components/LoginButton.tsx";
import { LogoutButton } from "@/Components/LogoutButton.tsx";
import { useEffect, useState } from "react";

export function NavBar() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  return (
    <nav className={"navbar justify-center rounded-b flex flex-col"}>
      <div className={"navbar-center lg:flex"}>

        <ul className={"menu menu-horizontal m-0"}>
          <li><Link to="/boulders"> Boulders</Link> </li>

          {
            user?.["https://my-app.example.com/roles"][0] === "Judge"
            ?
              <li><Link to="/boulders/create"> Create Boulder</Link> </li>
              :
              null
          }
          {
            isAuthenticated
            ?
              <>
                <p className="text-center">{user.name} </p>
                <li><LogoutButton/></li>
              </>
            :
            <li><LoginButton/></li>
          }

        </ul>
      </div>
    </nav>

  );
}
