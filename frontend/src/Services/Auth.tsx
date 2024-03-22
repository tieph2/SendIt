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
