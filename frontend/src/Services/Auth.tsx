// import { httpClient, serverUrl } from "@/Services/HttpClient.tsx";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
//
// export const AuthContext = createContext<AuthContextProps | null>(null);
//
// export type AuthContextProps = {
// 	token: string | null;
// 	name: string;
// 	email: string;
// 	id: number;
// 	profileUri: string;
// };
//
//
// export const updateAxios = async (token: string) => {
// 	httpClient.interceptors.request.use(
// 		async (config) => {
// 			// @ts-ignore
// 			config.headers = {
// 				Authorization: `Bearer ${token}`,
// 				Accept: "application/json",
// 			};
//
// 			return config;
// 		},
// 		(error) => {
// 			console.error("REJECTED TOKEN PROMISE");
// 			Promise.reject(error);
// 		}
// 	);
// };
//
// //
// // if (!(theToken == null)) {
// // 	console.log("Updating axios with token: ", theToken);
// // 	await updateAxios(theToken);
// // }
//
//
// //This component creates additional user info.
// export const AuthProvider = ({ children }: any) => {
//
//
// 	const { user, getAccessTokenSilently } = useAuth0();
// 	// const theToken =  getAccessTokenSilently();
// 	// const theEmail = "user.email";
// 	// const theName = "user.name";
// 	// const theProfileUri = "user.picture";
// 	const [ token, setToken] = useState("");
// 	const [ email, setEmail ] = useState("");
// 	const [ name, setName] = useState("");
// 	const [ profileUri, setProfileUri ] = useState("");
// 	const [ id, setId ] = useState(-1);
//
// 	//
// 	// useEffect(() => {
// 	// 	const getToken = async () => {
// 	// 		console.log("Refreshing auth");
// 	// 		const token = await getAccessTokenSilently();
// 	// 		return token;
// 	// 	};
// 	//
// 	// 	getToken().then((value) => {
// 	// 		setToken(value);
// 	// 		console.log(value);
// 	// 	});
// 	// },[]);
//
// 	// const getIdFromServer = {
// 	// 	async send(email: string) {
// 	// 		const getIdConfig = {
// 	// 			method: 'search',  // Specify your method here
// 	// 			url: serverUrl + "/users",
// 	// 			crossDomain: true,
// 	// 			data: {email: email}
// 	// 		};
// 	// 		const id = await httpClient.request(getIdConfig);
// 	// 		console.log(id.data);
// 	// 		return id.data;
// 	// 	}
// 	// };
//
//
// 	// useEffect(() => {
// 	// 	console.log("Refreshing auth provider");
// 	// 	const setUserAndUpdateAxios = async () => {
// 	// 		const auth0Token = await getAccessTokenSilently();
// 	// 		console.log("Token is: ", auth0Token);
// 	// 		const id = await getIdFromServer.send(user.email);
// 	// 		setId(id);
// 	// 		setProfileUri(user.picture);
// 	// 		setName(user.name);
// 	// 		console.log("Should inject header now");
// 	// 		return auth0Token;
// 	// 	};
// 	//
// 	// 	setUserAndUpdateAxios().then((value) => {
// 	// 		setToken(value);
// 	// 		return value;
// 	// 	}).then((value) => {
// 	// 		updateAxios(value);
// 	// 		console.log(value);
// 	// 	})
// 	// }, []);
//
//
//
// 	return (
// 		<AuthContext.Provider
// 			value={{
// 				token,
// 				name,
// 				email,
// 				id,
// 				profileUri,
// 			}}
// 		>
// 			{children}
// 		</AuthContext.Provider>
// 	);
// };
//
//
// export const useAuth = () => {
// 	return useContext(AuthContext);
// };
//
//
//
//
//

import { getIdFromServer, httpClient } from "@/Services/HttpClient.tsx";
import { createContext, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const AuthContext = createContext<AuthContextProps | null>(null);

export type AuthContextProps = {
	token: string | null;
	userEmail: string;
	getTokenAndInjectHeader: () => Promise<boolean>;
	getId: () => void;
};

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

const initialToken = getTokenFromStorage();

if (!(initialToken == null)) {
	await updateAxios(initialToken);
}

export const AuthProvider = ({ children }: any) => {
	const { getAccessTokenSilently, user } = useAuth0();

	const [token, setToken] = useState(initialToken);
	const [userEmail, setUserEmail] = useState("");

	const getTokenAndInjectHeader = async () => {
		try {
			setToken(initialToken);
			const thetoken = await getAccessTokenSilently();
			saveToken(thetoken);
			await updateAxios(thetoken);
			return true;
		} catch (err) {
			return false;
		}
	};

	const getId = async () => {
		return getIdFromServer();
	};

	const saveToken = (thetoken) => {
		setToken(thetoken);
		setUserEmail(user.email);
		localStorage.setItem("token", JSON.stringify(thetoken));
	};

	return (
		<AuthContext.Provider
			value={{
				token,
				userEmail,
				getTokenAndInjectHeader,
				getId,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};

function getTokenFromStorage() {
	const tokenString = localStorage.getItem("token");

	if (typeof tokenString === "undefined" || tokenString === null) {
		console.error("No token found");
		return null;
	}
	return tokenString;
}
