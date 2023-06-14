import { BoulderCard } from "@/Components/BoulderCard.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import {
	getBouldersFromServer,
	getIdByEmailFromServer
} from "@/Services/HttpClient.tsx";
import {  useEffect, useState } from "react";
import { Ranking } from "@/Components/Ranking.tsx";

export const BoulderPage = () => {
	const [boulders, setBoulders] = useState([]);

	const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
	const [userId, setUserId] = useState();

	useEffect(() => {
		const getId = async () => {
			return getIdByEmailFromServer(user.email);
		};

		getId().then((value) => {
			setUserId(value);
		});
	}, []);

	const fetchBoulders = () => {
		getBouldersFromServer()
			.then((response) => setBoulders(response))
			.catch((err) => console.log("Error in fetch boulders", err));
	};

	useEffect(() => {
		fetchBoulders();
	}, []);

	return (
		<div className="container flex flex-row">
			<div className={"boulderPage flex flex-row flex-wrap lg:w-5/6 md:w-2/3"}>
				{boulders.map((item) => {
					return <BoulderCard key={item.id} {...item} user_id={userId} />;
				})}
			</div>
			<Ranking />
		</div>
	);
};
