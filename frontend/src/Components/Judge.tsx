
import {  RegistrationType } from "@/SenditTypes.ts";
import { GetCurrentRegistration } from "@/Services/QueueService.tsx";
import { PassService } from "@/Services/PassService.tsx";
import { Dequeue } from "@/Services/QueueService.tsx";
import {  useEffect, useState } from "react";
import { CurrentRegistration } from "@/Components/CurrentRegistration.tsx";
import { UpdateAttempt } from "@/Services/ScoreService.tsx";

export const Judge = () => {
	const [currentRegistration, setCurrentRegistration] = useState<RegistrationType>();
	const [zone, setZone] = useState(1);

	const fetchRegistration = () => {
		GetCurrentRegistration.send(zone)
			.then((response) => {
				setCurrentRegistration(response);
			})
			.catch( (err) => {
				console.log("Error in fetch next climber in queue", err);
				setCurrentRegistration(null);
			});
	};

	useEffect(() => {
		fetchRegistration();
	});

	const onPassButtonClick = () => {
		UpdateAttempt.send(currentRegistration.id, currentRegistration.boulder_id, true)
			.catch(err => {
				console.error(err);
			});
		PassService.send(currentRegistration.id, currentRegistration.boulder_id)
			.catch(err => {
				console.log("Error passing climber");
				console.error(err);
			});
		Dequeue.send(currentRegistration.id, currentRegistration.boulder_id)
			.catch(err => {
				console.error(err);
			});
		fetchRegistration();
	};

	const onFailButtonClick = () => {
		UpdateAttempt.send(currentRegistration.id, currentRegistration.boulder_id, false)
			.catch(err => {
				console.error(err);
			});
		Dequeue.send(currentRegistration.id, currentRegistration.boulder_id)
			.catch(err => {
				console.error(err);
			});
		fetchRegistration();
	};


	const nextClimber = (
		<CurrentRegistration
			{...currentRegistration}
			onPassButtonClick={onPassButtonClick}
			onFailButtonClick={onFailButtonClick}
		/>
	);

	return (
		<div className={"container"}>
			<div className="mb-6">
				<label htmlFor="option1" className="block font-medium mb-1">
					Select your zone
				</label>
				<select
					id="option1"
					className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					onChange={e => setZone(parseInt(e.target.value))}
				>
					<option value="">Selection</option>
					<option value="1">Zone 1</option>
					<option value="2">Zone 2</option>
					<option value="3">Zone 3</option>
					<option value="4">Zone 4</option>

				</select>
			</div>
			{
				currentRegistration
					?
					nextClimber
					:
					<p>Zone {zone} has no registered climber :(</p>
			}
		</div>
	);
};
