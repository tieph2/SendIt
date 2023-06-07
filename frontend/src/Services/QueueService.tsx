import { httpClient } from "@/Services/HttpClient.tsx";

const serverIP = import.meta.env.API_HOST;
const serverPort = import.meta.env.PORT;

const serverUrl = `http://${serverIP}:${serverPort}`;

//This service removes climber-boulder registration, essentially removing a climber from the line-up
export const Dequeue = {
	async send(climber_id: number, boulder_id: number) {
		return httpClient.delete("/registration", {data: {climber_id: climber_id, boulder_id: boulder_id}});
	}
};



export const GetQueue = {
	async send(boulder_id: number) {
		const boulder_queue_config = {
			method: 'search',  // Specify your method here
			url: serverUrl + "/registration",
			crossDomain: true,
			data: {boulder: boulder_id}
		};
		const climbers = await httpClient.request(boulder_queue_config);
		return climbers.data;
	}
};