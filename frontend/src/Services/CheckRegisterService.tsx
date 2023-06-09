import { httpClient, serverUrl } from "@/Services/HttpClient.tsx";

export const MessageService = {
  async send(sender_id: number, receiver_id: number, message: string) {
    return httpClient.post("/messages", {sender_id: sender_id, receiver_id: receiver_id, message: message});
  }
};



export const CheckRegisterService = {
  async send(token: string) {
    const pass_service_config = {
      method: 'search',  // Specify your method here
      url: serverUrl + "/users",
      crossDomain: true,
      data: {
        token: token
      }
    };
    return httpClient.request(pass_service_config);
  }
};