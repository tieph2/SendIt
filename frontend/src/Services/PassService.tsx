import { httpClient, serverUrl } from "@/Services/HttpClient.tsx";

export const PassService = {
	async send(climberID: number, boulderID: number) {
		const pass_service_config = {
			method: "put", // Specify your method here
			url: serverUrl + "/attempts",
			crossDomain: true,
			data: {
				climberID: climberID,
				boulderID: boulderID,
				successful: true,
			},
		};
		return httpClient.request(pass_service_config);
	},
};
