import { httpClient, serverUrl } from "@/Services/HttpClient.tsx";

//This service removes climber-boulder registration, essentially removing a climber from the line-up
export const Dequeue = {
	async send(climberID: number, boulderID: number) {
		const dequeueConfig = {
			method: "delete", // Specify your method here
			url: serverUrl + "/registration",
			crossDomain: true,
			data: {
				climberID: climberID,
				boulderID: boulderID,
			},
		};
		return httpClient.request(dequeueConfig);
	},
};

//This service search for all registration of a boulder
export const GetQueue = {
	async send(boulderID: number) {
		const boulderQueueConfig = {
			method: "search", // Specify your method here
			url: serverUrl + "/registration",
			crossDomain: true,
			data: { boulder: boulderID },
		};
		const climbers = await httpClient.request(boulderQueueConfig);
		return climbers.data;
	},
};

export const EnQueue = {
	async send(climberID: number, boulderID: number) {
		const registration = await httpClient.post("/registration", {
			climberID: climberID,
			boulderID: boulderID,
		});
		return registration.data;
	},
};

export const GetCurrentRegistration = {
	async send(zone: number) {
		const boulderQueueConfig = {
			method: "search", // Specify your method here
			url: serverUrl + "/registration/top",
			crossDomain: true,
			data: { zone: zone },
		};
		const climbers = await httpClient.request(boulderQueueConfig);
		return climbers.data;
	},
};
