import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { httpClient } from "@/Services/HttpClient.tsx";
import { AuthProvider } from "@/Services/Auth.tsx";


const clientID = import.meta.env.AUTH0_CLIENT_ID;
const domain = import.meta.env.AUTH0_DOMAIN;
const scope = import.meta.env.AUTH0_SCOPE;
const audience = import.meta.env.AUTH0_AUDIENCE;

const rootContainer: HTMLElement = document.getElementById("root") as HTMLElement;


ReactDOM.createRoot(rootContainer).render(
	<React.StrictMode>
		<Auth0Provider
			domain={domain}
			clientId={clientID}
			authorizationParams={{
				audience: audience,//dev-qkx24qj8k5y2znxf.us.auth0.com/api/v2/,
				redirect_uri: window.location.origin,
				scope: scope
		}}
		>
			<AuthProvider>
				<App />
			</AuthProvider>
		</Auth0Provider>
	</React.StrictMode>
);
