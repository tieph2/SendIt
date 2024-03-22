import { httpClient, serverUrl } from "@/Services/HttpClient.tsx";

export const CheckRegisterService = {
	async send(token: string) {
		const passServiceConfig = {
			method: "search", // Specify your method here
			url: serverUrl + "/users",
			crossDomain: true,
			data: {
				token: token,
			},
		};
		return httpClient.request(passServiceConfig);

	},
};
