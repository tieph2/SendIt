import { httpClient, serverUrl } from "@/Services/HttpClient.tsx";

/** A front-end service for judge users to pass a climber
 * who climbs a boulder
 */
export const PassService = {
	async send(climberId: number, boulderId: number) {
		const pass_service_config = {
			method: "put", // Specify your method here
			url: serverUrl + "/attempts",
			crossDomain: true,
			data: {
				climberId: climberId,
				boulderId: boulderId,
				successful: true,
			},
		};
		return httpClient.request(pass_service_config);
	},
};
