import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout() {
	const auth = useAuth0();
	const navigate = useNavigate();

	// useEffect( () => {
	// 	async function processLogout() {
	// 		if(auth) {
	// 			await auth.handleLogout();
	// 			navigate("/");
	// 		} else {
	// 			console.error("Authorization is missing somehow");
	// 			navigate("/");
	// 		}
	// 	}
	//
	// 	processLogout().then( () => {
	// 		console.log("Logout completed successfully");
	// 	});
	// });

	return (<></>);
}
