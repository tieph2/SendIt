
import { Profile } from "@/Components/Profile.tsx";
import { ProfileType } from "@/SenditTypes.ts";
import { useAuth } from "@/Services/Auth.tsx";
import { getNextProfileFromServer } from "@/Services/HttpClient.tsx";
import { MatchService } from "@/Services/MatchService.tsx";
import { MessageService } from "@/Services/MessageService.tsx";
import { PassService } from "@/Services/PassService.tsx";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const Match = () => {
	const [currentProfile, setCurrentProfile] = useState<ProfileType>();
	const auth = useAuth();
	const navigate = useNavigate();
	
	
	const fetchProfile = () => {
		getNextProfileFromServer()
			.then((response) => setCurrentProfile(response))
			.catch( (err) => console.log("Error in fetch profile", err));
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	const onLikeButtonClick = () => {
		MatchService.send(auth.userId, currentProfile.id)
			.then(fetchProfile)
			.catch(err => {
				console.error(err);
				fetchProfile();
			});
	};
	
	const onPassButtonClick = () => {
		PassService.send(auth.userId, currentProfile.id)
			.then(fetchProfile)
			.catch(err => {
				console.error(err);
				fetchProfile();
			});
	};
	const onMessageButtonClick = () => {
		navigate("/messages", {state: {imgUri: currentProfile.imgUri, name: currentProfile.name, id: currentProfile.id}});
	};

	const profile = (
		<Profile
			{...currentProfile}
			onLikeButtonClick={onLikeButtonClick}
			onPassButtonClick={onPassButtonClick}
			onMessageButtonClick={onMessageButtonClick}
		/>
	);

	return (
		<>
			{profile}
		</>
	);
};
