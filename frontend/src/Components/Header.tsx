import React from 'react';
import { NavBar} from "@/Components/Navigation.tsx";
import Countdown from "@/Components/CountDown.tsx";

import SenditLogo from '../assets/images/SenditLogo.svg';
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <header className="header flex flex-col items-center shadow-lg">
      <Link to="/">
        <div className="my-2">
          <img src={SenditLogo} alt="Sendit Logo" className="h-10" />
        </div>
      </Link>

      <NavBar/>

      <Countdown/>
    </header>
  );
};

export default Header;
