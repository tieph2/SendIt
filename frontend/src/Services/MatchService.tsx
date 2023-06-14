import { httpClient } from "@/Services/HttpClient.tsx";

export const PassService = {
	async send(climber_id: number, boulder_id: number) {
		return httpClient.post("/attempts", { climber_id: climber_id, boulder_id: boulder_id });
	},
};
