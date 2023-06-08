import { httpClient, serverUrl } from "@/Services/HttpClient.tsx";

export const PassService = {
	async send(climber_id: number, boulder_id: number) {
		const pass_service_config = {
			method: 'put',  // Specify your method here
			url: serverUrl + "/attempts",
			crossDomain: true,
			data: {
				climber_id: climber_id,
				boulder_id: boulder_id,
				successful: true
			}
		};
		return httpClient.request(pass_service_config);
	}
};