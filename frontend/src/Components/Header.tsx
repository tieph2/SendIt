import React from 'react';
import { NavBar} from "@/Components/Navigation.tsx";
import Countdown from "@/Components/CountDown.tsx";

const Header = () => {
  return (
    <header className="flex flex-col items-center bg-gray-800 text-white py-4">
      <div className="mb-4">
        <img src="logo.png" alt="Logo" className="h-10" />
      </div>
      <NavBar/>
      <Countdown/>
    </header>
  );
};

export default Header;
