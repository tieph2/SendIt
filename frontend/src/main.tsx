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
		<App />
	</React.StrictMode>
);
