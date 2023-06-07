import { httpClient } from "@/Services/HttpClient.tsx";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<AuthContextProps | null>(null);

export type AuthContextProps = {
	token: string | null;
	userId: number;
	handleLogin: (email: string, password: string) => Promise<boolean>;
	handleLogout: () => void;
};

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


// export const AuthProvider = ({ children }: any) => {
// 	const navigate = useNavigate();
//
// 	const handleLogin = async (email: string, password: string) => {
// 		console.log("In handleLogin with ", email, password);
//
// 		try {
// 			const thetoken = await getLoginTokenFromServer(email, password);
// 			await updateAxios(thetoken);
// 			// Hooray we're logged in and our token is saved everywhere!
// 			navigate(-1);
// 			return true;
// 		} catch (err) {
// 			console.error("Failed to handle login: ", err);
// 			navigate("/login");
// 			return false;
// 		}
// 	};
//
// 	const handleLogout = () => {
// 		setToken(null);
// 		localStorage.removeItem("token");
// 	};
//
// 	const saveToken = (thetoken) => {
// 		console.log(thetoken);
// 		setToken(thetoken);
// 		setUserId(getUserIdFromToken(thetoken));
// 		localStorage.setItem("token", JSON.stringify(thetoken));
// 	};
//
// 	return (
// 		<AuthContext.Provider
// 			value={{
// 				token,
// 				userId,
// 				handleLogin,
// 				handleLogout,
// 			}}
// 		>
// 			{children}
// 		</AuthContext.Provider>
// 	);
// };
//

