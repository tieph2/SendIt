import axios from "axios";

const serverIP = import.meta.env.API_HOST;
const serverPort = import.meta.env.PORT;

const pythonIP = import.meta.env.PYTHON_HOST;
const pythonPort = import.meta.env.PYTHON_PORT;

export const serverUrl = `http://${serverIP}:${serverPort}`;
export const pythonServerUrl = `http://${pythonIP}:${pythonPort}`;

// This is why I use Axios over Fetch
export const httpClient = axios.create({
	baseURL: serverUrl,
	headers: {
		"Content-type": "application/json",
	},
});

export const httpPythonClient = axios.create({
	baseURL: pythonServerUrl,
	headers: {
		"Content-type": "application/json",
	},
});

export async function getBouldersFromServer() {
	const boulders = await httpClient.get("/boulders");
	return boulders.data;
}

export async function getJudgesFromServer() {
	const judges = await httpPythonClient.get("/judges");
	return judges.data;
}

export async function getRankingFromServer() {
	const ranking = await httpClient.get("/ranking");
	return ranking.data;
}

//Get id when token is present
export async function getIdFromServer() {
	const id = await httpClient.get("/user");
	return id.data;
}

//Get id with only email
export async function getIdByEmailFromServer(email) {
	const get_id_config = {
		method: "search", // Specify your method here
		url: serverUrl + "/users",
		crossDomain: true,
		data: {
			email: email,
		},
	};
	const id = await httpClient.request(get_id_config);
	return id.data;
}
