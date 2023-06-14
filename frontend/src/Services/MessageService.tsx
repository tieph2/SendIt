import { httpClient } from "@/Services/HttpClient.tsx";

export const MessageService = {
	async send(sender_id: number, receiver_id: number, message: string) {
		return httpClient.post("/messages", {
			sender_id: sender_id,
			receiver_id: receiver_id,
			message: message,
		});
	},
};
