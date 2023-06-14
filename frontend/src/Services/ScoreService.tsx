import { httpClient, serverUrl } from "@/Services/HttpClient.tsx";

export const UpdateAttempt = {
	async send(climber_id: number, boulder_id: number, successful: boolean) {
		const boulder_queue_config = {
			method: "put", // Specify your method here
			url: serverUrl + "/attempts",
			crossDomain: true,
			data: {
				climber_id: climber_id,
				boulder_id: boulder_id,
				successful: successful,
			},
		};
		const climbers = await httpClient.request(boulder_queue_config);
		return climbers.data;
	},
};
