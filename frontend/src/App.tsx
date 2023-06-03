import { SenditRouter } from "@/SenditRoutes.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { Link, Route, Routes, Router, BrowserRouter } from "react-router-dom";
import "@css/main.css";

const clientID = import.meta.env.AUTH0_CLIENT_ID;
const domain = import.meta.env.AUTH0_DOMAIN;

const serverIP = import.meta.env.API_HOST;
const serverPort = import.meta.env.PORT;

const serverUrl = `http://${serverIP}:${serverPort}`;

console.log(domain);
// This is our base React Component
export function App() {
	return (
		<BrowserRouter>
			<Auth0Provider
				domain={domain}
				clientId={clientID}
				authorizationParams={{
					redirect_uri: "http://localhost:5173"
				}}
			>
				<div className="Sendit">
					<SenditRouter/>
				</div>
			</Auth0Provider>
		</BrowserRouter>
	);
}

export default App;





