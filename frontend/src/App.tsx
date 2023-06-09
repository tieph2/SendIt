import { SenditRouter } from "@/SenditRoutes.tsx";
import { BrowserRouter } from "react-router-dom";
import "@css/main.css";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthContext } from "@/Services/Auth.tsx";
import { useEffect, useState } from "react";
import { httpClient, serverUrl } from "@/Services/HttpClient.tsx";

// This is our base React Component
export function App() {
	const {user} = useAuth0();
	const [email, setEmail] = useState();
	const [id, setId] = useState();

	 const getIdFromServer = {
		async send(email: string) {
			const getIdConfig = {
				method: 'search',  // Specify your method here
				url: serverUrl + "/users",
				crossDomain: true,
				data: {email: email}
			};
			const id = await httpClient.request(getIdConfig);
			console.log(id.data);
			return id.data;
		}
	};


	useEffect(() => {
		const getId = async () => {
			const id = await getIdFromServer.send(email);
			return id;
		};

		getId().then((value) => {
			setId(value);
			console.log(value);
		});
	});

	return (
		<AuthContext.Provider value = {id}>
			<BrowserRouter>
				<div className="Sendit">
					<SenditRouter/>
				</div>
			</BrowserRouter>
		</AuthContext.Provider>

	);
}

export default App;





