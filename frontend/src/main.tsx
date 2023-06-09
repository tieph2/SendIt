import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { httpClient } from "@/Services/HttpClient.tsx";


const clientID = import.meta.env.AUTH0_CLIENT_ID;
const domain = import.meta.env.AUTH0_DOMAIN;
const scope = import.meta.env.AUTH0_SCOPE;

const serverIP = import.meta.env.API_HOST;
const serverPort = import.meta.env.PORT;

const rootContainer: HTMLElement = document.getElementById("root") as HTMLElement;


ReactDOM.createRoot(rootContainer).render(
	<React.StrictMode>
		<Auth0Provider
			domain={domain}
			clientId={clientID}
			authorizationParams={{
				redirect_uri: window.location.origin,
				scope: scope
		}}
		>
			<App />
		</Auth0Provider>
	</React.StrictMode>
);
