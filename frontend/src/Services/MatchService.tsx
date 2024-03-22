import { httpClient } from "@/Services/HttpClient.tsx";

export const PassService = {
	async send(climberID: number, boulderID: number) {
		return httpClient.post("/attempts", { climberID: climberID, boulderID: boulderID });
	},
};
