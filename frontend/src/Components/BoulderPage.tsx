
import { BoulderCard } from "@/Components/BoulderCard.tsx";
import { ProfileType } from "@/SenditTypes.ts";
import { useAuth } from "@/Services/Auth.tsx";
import {
  getBouldersFromServer, getNextProfileFromServer
} from "@/Services/HttpClient.tsx";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const BoulderPage = () => {
  const [boulders, setBoulders] = useState([]);
  const auth = useAuth();
  const navigate = useNavigate();


  const fetchBoulders = () => {
    getBouldersFromServer()
      .then((response) => setBoulders(response))
      .catch( (err) => console.log("Error in fetch boulders", err));
  };

  useEffect(() => {
    fetchBoulders();
  }, []);


  return (
    <div className={"BoulderPage"}>
      {
        boulders.map((item) => {
          return <BoulderCard
            {...item}
          />;
        })
      }
    </div>
  );
};
