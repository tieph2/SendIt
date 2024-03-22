import { httpClient, serverUrl } from "@/Services/HttpClient.tsx";

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
