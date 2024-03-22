import { httpClient, serverUrl } from "@/Services/HttpClient.tsx";

/** A front-end service for judge to update a climber's attempt
 * at a boulder problem
 */
export const UpdateAttempt = {
	async send(climberID: number, boulderID: number, successful: boolean) {
		const boulderQueueConfig = {
			method: "put", // Specify your method here
			url: serverUrl + "/attempts",
			crossDomain: true,
			data: {
				climberID: climberID,
				boulderID: boulderID,
				successful: successful,
			},
		};
		const climbers = await httpClient.request(boulderQueueConfig);
		return climbers.data;
	},
};
