
import { Profile } from "@/Components/Profile.tsx";
import { ProfileType } from "@/SenditTypes.ts";
import  { GetQueue} from "@/Services/QueueService.tsx";
import { useContext, useEffect, useState } from "react";
import { BoulderCard } from "@/Components/BoulderCard.tsx";

const minioUrl = `http://localhost:9000/sendit/}`;



export const Queue = (props : {boulder_id}) => {

  const [currentClimbers, setCurrentClimbers] = useState([]);
  const { boulder_id } = props;



  useEffect(() => {
    const fetchClimbers = () => {
    GetQueue.send(boulder_id)
      .then((response) => {
        setCurrentClimbers(response);
        console.log(currentClimbers);
      })
      .catch( (err) => console.log("Error in fetch profile", err));
  };
    fetchClimbers();
  }, [boulder_id]);


  return (
    <div className={"avatar-list flex"}>
      {
        currentClimbers.map((climber) => {
          return <img className={"avatar-sm"}
            key={climber[0].id}
            src={`http://localhost:9000/sendit/${climber[0].imgUri}`}
            alt={`Climber ${climber[0].id} profile pic`}
          />;
        })
      }
    </div>
  );
};
