import { httpClient, serverUrl } from "@/Services/HttpClient.tsx";

/** A front-end service for judge users to removes climber-boulder registration,
 *  essentially removing a climber from the line-up
 */
export const Dequeue = {
	async send(climberId: number, boulderId: number) {
		const dequeueConfig = {
			method: "delete", // Specify your method here
			url: serverUrl + "/registration",
			crossDomain: true,
			data: {
				climberId: climberId,
				boulderId: boulderId,
			},
		};
		return httpClient.request(dequeueConfig);
	},
};

/** A front-end service for getting the current
 * climber queue for a boulder problem
 */
export const GetQueue = {
	async send(boulderId: number) {
		const boulderQueueConfig = {
			method: "search", // Specify your method here
			url: serverUrl + "/registration",
			crossDomain: true,
			data: { boulder: boulderId },
		};
		const climbers = await httpClient.request(boulderQueueConfig);
		return climbers.data;
	},
};

/** A front-end service for climber to
 * queue up for a bouldering problem
 */
export const EnQueue = {
	async send(climberId: number, boulderIs: number) {
		const registration = await httpClient.post("/registration", {
			climberId: climberId,
			boulderId: boulderIs,
		});
		return registration.data;
	},
};

/** A front-end service for judge to get all climber-boulder
 * registration at a zone
 */
export const GetZoneRegistration = {
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
