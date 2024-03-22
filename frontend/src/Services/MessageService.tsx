import { httpClient } from "@/Services/HttpClient.tsx";

export const MessageService = {
	async send(senderID: number, receiverID: number, message: string) {
		return httpClient.post("/messages", {
			senderID: senderID,
			receiverID: receiverID,
			message: message,
		});
	},
};
