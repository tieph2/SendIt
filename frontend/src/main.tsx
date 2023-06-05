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

//Add token to all request body
const updateAxios = async (token: string) => {
	httpClient.interceptors.request.use(
		async (config) => {
			// @ts-ignore
			config.headers = {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			};
			return config;
		},
		(error) => {
			console.error("REJECTED TOKEN PROMISE");
			Promise.reject(error);
		}
	);
};

ReactDOM.createRoot(rootContainer).render(
	<React.StrictMode>
		<Auth0Provider
			domain={domain}
			clientId={clientID}
			authorizationParams={{redirect_uri: "http://localhost:5173" }}
		>
			<App />
		</Auth0Provider>
	</React.StrictMode>
);
