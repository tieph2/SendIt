import { ProfileType, BoulderType } from "@/SenditTypes.ts";
import axios from "axios";

const serverIP = import.meta.env.API_HOST;
const serverPort = import.meta.env.PORT;

const serverUrl = `http://${serverIP}:${serverPort}`;
console.log(serverUrl);
// This is why I use Axios over Fetch
export const httpClient = axios.create({
	baseURL: serverUrl,
	headers: {
		"Content-type": "application/json",
	},
});

export async function getNextProfileFromServer() {
	const profile =
		await httpClient.get<ProfileType>("/profile");
	return profile.data;
}

export async function getBouldersFromServer() {
	const boulders =
		await httpClient.get("/boulders");
	return boulders.data;
}