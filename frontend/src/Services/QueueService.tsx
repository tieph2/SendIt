import { httpClient, serverUrl } from "@/Services/HttpClient.tsx";

/** A front-end service for judge users to removes climber-boulder registration,
 *  essentially removing a climber from the line-up
 */
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

/** A front-end service for getting the current
 * climber queue for a boulder problem
 */
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

/** A front-end service for climber to
 * queue up for a bouldering problem
 */
export const EnQueue = {
	async send(climberID: number, boulderID: number) {
		const registration = await httpClient.post("/registration", {
			climberID: climberID,
			boulderID: boulderID,
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
