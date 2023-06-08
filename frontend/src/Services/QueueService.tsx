import { httpClient, serverUrl} from "@/Services/HttpClient.tsx";


//This service removes climber-boulder registration, essentially removing a climber from the line-up
export const Dequeue = {
	async send(climber_id: number, boulder_id: number) {
		const dequeue_config = {
			method: 'delete',  // Specify your method here
			url: serverUrl + "/registration",
			crossDomain: true,
			data: {
				climber_id: climber_id,
				boulder_id: boulder_id,
			}
		};
		return httpClient.request(dequeue_config);
	}
};



//This service search for all registration of a boulder
export const GetQueue = {
	async send(boulder_id: number) {
		const boulder_queue_config = {
			method: 'search',  // Specify your method here
			url: serverUrl + "/registration",
			crossDomain: true,
			data: {boulder: boulder_id}
		};
		const climbers = await httpClient.request(boulder_queue_config);
		return climbers.data;
	}
};



export const GetCurrentRegistration = {
	async send(zone: number) {
		const boulder_queue_config = {
			method: 'search',  // Specify your method here
			url: serverUrl + "/registration/top",
			crossDomain: true,
			data: {zone: zone}
		};
		const climbers = await httpClient.request(boulder_queue_config);
		return climbers.data;
	}
};