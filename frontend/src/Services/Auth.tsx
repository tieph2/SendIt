import { httpClient } from "@/Services/HttpClient.tsx";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<AuthContextProps | null>(null);

export type AuthContextProps = {
	userId: number;
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


