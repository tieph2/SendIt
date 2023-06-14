import { SenditRouter } from "@/SenditRoutes.tsx";
import { BrowserRouter } from "react-router-dom";
import "@css/main.css";
import React, { useEffect, useState } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { httpClient } from "@/Services/HttpClient.tsx";
import { AuthProvider } from "@/Services/Auth.tsx";


const clientID = import.meta.env.AUTH0_CLIENT_ID;
const domain = import.meta.env.AUTH0_DOMAIN;
const scope = import.meta.env.AUTH0_SCOPE;
const audience = import.meta.env.AUTH0_AUDIENCE;


// This is our base React Component
export function App() {


	return (
			<BrowserRouter>

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

						<div className="Sendit">
							<SenditRouter/>
						</div>

					</AuthProvider>

				</Auth0Provider>

			</BrowserRouter>

	);
}

export default App;





