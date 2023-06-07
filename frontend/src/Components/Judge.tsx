
import { Profile } from "@/Components/Profile.tsx";
import { ProfileType } from "@/SenditTypes.ts";
import { getNextClimberFromServer } from "@/Services/HttpClient.tsx";
import { PassService } from "@/Services/PassService.tsx";
import { Dequeue } from "@/Services/QueueService.tsx";
import { useContext, useEffect, useState } from "react";

export const Judge = () => {
  const [currentProfile, setCurrentProfile] = useState<ProfileType>();
  const climber_id = 1;
  const boulder_id = 1;

  const fetchProfile = () => {
    getNextClimberFromServer()
      .then((response) => setCurrentProfile(response))
      .catch( (err) => console.log("Error in fetch profile", err));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const onPassButtonClick = () => {
    PassService.send(climber_id, boulder_id)
      .then(fetchProfile)
      .catch(err => {
        console.error(err);
        fetchProfile();
      });
    Dequeue.send(climber_id, boulder_id)
      .then(fetchProfile)
      .catch(err => {
        console.error(err);
        fetchProfile();
      });
  };

  const onFailButtonClick = () => {
    Dequeue.send(climber_id, boulder_id)
      .then(fetchProfile)
      .catch(err => {
        console.error(err);
        fetchProfile();
      });
  };

  const profile = (
    <Profile
      {...currentProfile}
      onPassButtonClick={onPassButtonClick}
      onFailButtonClick={onFailButtonClick}
    />
  );

  return (
    <>
      {profile}
    </>
  );
};
