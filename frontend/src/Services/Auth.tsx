import { httpClient, serverUrl } from "@/Services/HttpClient.tsx";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const AuthContext = createContext<AuthContextProps | null>(null);

export type AuthContextProps = {
	token: string | null;
	name: string;
	email: string;
	id: number;
	profileUri: string;
};


export const updateAxios = async (token: string) => {
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

//This component creates additional user info.
export const AuthProvider = ({ children }: any) => {
	const { user, getAccessTokenSilently } = useAuth0();

	const [token, setToken] = useState("");
	const [ email, setEmail ] = useState("");
	const [ name, setName] = useState("");
	const [ profileUri, setProfileUri ] = useState("");
	const [ id, setId ] = useState(-1);

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
		console.log("Refreshing auth provider");
		const setUserAndUpdateAxios = async () => {
			const token = await getAccessTokenSilently();
			setName(user.name);
			setEmail(user.email);
			setToken(token);
			console.log(token);
			// @ts-ignore
			const id = await getIdFromServer();
			setId(id);
			setProfileUri(user.picture);
			console.log("Should inject header now");
			return id;
		};

		setUserAndUpdateAxios().then((value) => {
			console.log(value);
		});
	});



	return (
		<AuthContext.Provider
			value={{
				token,
				name,
				email,
				id,
				profileUri,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};


export const useAuth = () => {
	return useContext(AuthContext);
};





