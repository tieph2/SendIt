
import  { GetQueue} from "@/Services/QueueService.tsx";
import {  useEffect, useState } from "react";

const minioUrl = `http://localhost:9000/sendit/`;


export const Queue = (props : {boulder_id}) => {
  const [time, setTime] = useState(new Date());
  const [currentClimbers, setCurrentClimbers] = useState([]);
  const { boulder_id } = props;



  useEffect(() => {
    const fetchClimbers = () => {
    GetQueue.send(boulder_id)
      .then((response) => {
        setCurrentClimbers(response);
      })
      .catch( (err) => console.log("Error in fetch profile", err));
  };
    fetchClimbers();
  });


  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      //console.log("Queue refreshed");
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className={"avatar-list flex gap-2 flex-wrap"}>
      {
        currentClimbers.map((climber) => {
          return <img className={"avatar-sm"}
            key={climber[0].id}
            src={minioUrl+climber[0].imgUri}
            alt={`Climber ${climber[0].id} profile pic`}
          />;
        })
      }
    </div>
  );
};
