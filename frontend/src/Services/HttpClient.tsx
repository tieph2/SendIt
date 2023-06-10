import axios from "axios";

const serverIP = import.meta.env.API_HOST;
const serverPort = import.meta.env.PORT;

export const serverUrl = `http://${serverIP}:${serverPort}`;

// This is why I use Axios over Fetch
export const httpClient = axios.create({
	baseURL: serverUrl,
	headers: {
		"Content-type": "application/json",
	},
});



export async function getBouldersFromServer() {
	const boulders =
		await httpClient.get("/boulders");
	return boulders.data;
}


export async function getRankingFromServer() {
	const ranking =
		await httpClient.get("/ranking");
	return ranking.data;
}






