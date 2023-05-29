import { ProfileProps } from "@/Components/Profile.tsx";
import { useAuth } from "@/Services/Auth.tsx";
import { httpClient } from "@/Services/HttpClient.tsx";
import { MessageService } from "@/Services/MessageService.tsx";
import { PassService } from "@/Services/PassService.tsx";
import { useState } from "react";
import { useLocation} from "react-router-dom";

export function Message() {
	const location = useLocation();
	const [message, setMessage] = useState("Send me a message right meow");
	const auth = useAuth();
	
	const avatarURI = "http://localhost:9000/doggr/" + location.state.imgUri;
	const receiver_name = location.state.name;
	const receiver_id = location.state.id;
	const onSendButtonClick = () => {
		MessageService.send(auth.userId, receiver_id, message)
			.catch(err => {
				console.error(err);
			});
	};
	
	console.log(auth.userId, receiver_id);
	
	return (
		<div className="flex flex-col items-center bg-slate-700 w-4/5 mx-auto p-5 rounded-box">
			<h2 className="text-4xl text-blue-600 mb-5">Message</h2>
			
			<div className="flex flex-col w-full mb-5">
				<div className="avatar">
					<div className="w-24 rounded">
						<img src={avatarURI} alt={"Profile pic"}/>
					</div>
				</div>
				<label htmlFor="name" className="text-blue-300 mb-2">{receiver_name}</label>
				<input
					placeholder="Message..."
					type="text"
					id="message"
					required
					value={message}
					onChange={e => setMessage(e.target.value)}
					name="name"
					className="input input-bordered"
				/>
			</div>
			
			
			{
				message != null &&
				<div>
					<button className="btn btn-primary btn-circle" onClick={onSendButtonClick}>Send</button>
				</div>
			}
		</div>
	);
	
}
