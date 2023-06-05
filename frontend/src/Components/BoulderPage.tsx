
import { BoulderCard } from "@/Components/BoulderCard.tsx";
import { ProfileType } from "@/SenditTypes.ts";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getBouldersFromServer, getNextProfileFromServer
} from "@/Services/HttpClient.tsx";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const BoulderPage = () => {
  const [boulders, setBoulders] = useState([]);
  const navigate = useNavigate();

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessTokenSilently();
      return token;
    };

    getToken().then((value) => {
      setToken(value);
      console.log(token);
      console.log(user);
    });
  });


  const fetchBoulders = () => {
    getBouldersFromServer()
      .then((response) => setBoulders(response))
      .catch( (err) => console.log("Error in fetch boulders", err));
  };

  useEffect(() => {
    fetchBoulders();
  }, []);


  return (
    <div className={"BoulderPage flex"}>
      {
        boulders.map((item) => {
          return <BoulderCard
            key={item.id}
            {...item}
          />;
        })
      }
    </div>
  );
};
