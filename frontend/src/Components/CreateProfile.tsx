import { httpClient } from "@/Services/HttpClient.tsx";
import { useState } from "react";

export enum SubmissionStatus {
	NotSubmitted,
	SubmitFailed,
	SubmitSucceeded
}



export const CreateProfile = () => {

	const [selectedFile, setSelectedFile] = useState();
	const [name, setName] = useState("");
	const [skillLevel, setSkillLevel] = useState(0);
	const [submitted, setSubmitted] = useState(SubmissionStatus.NotSubmitted);

	const onFileChange = ev => {
		setSelectedFile(ev.target.files[0]);
	};

	const onUploadFile = (ev) => {
		const formData = new FormData();

		formData.append("name", name);
		formData.append("skill_level", skillLevel.toString());
		formData.append('file', selectedFile);

		// @ts-ignore
		formData.append("fileName", selectedFile.name);

		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			}
		};

		httpClient.post("/users", formData, config)
			.then( (response) => {
				console.log("Got response from uploading file", response.status);
				if (response.status === 200) {
					setSubmitted(SubmissionStatus.SubmitSucceeded);
				} else {
					setSubmitted(SubmissionStatus.SubmitFailed);
				}
			});
	};

	const handleNumberInputChange = (e) => {
		// Remove any non-digit characters from the input value
		const sanitizedValue = e.target.value.replace(/\D/g, '');
		// Update the input value
		setSkillLevel(sanitizedValue);
	};


	return (

		<div className="createBoulderPage">
			<div className="max-w-md mx-auto mt-4 p-6 bg-white rounded-md shadow-md">
				<h2 className="text-2xl font-bold mb-6">Sign up for the competition</h2>
				<form>

					<div className="mb-6">
						<label htmlFor="name" className="block font-medium mb-1">
							Name
						</label>
						<input
							type="text"
							id="name"
							className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Adam Ondra"
						/>
					</div>
					<div className="mb-6">
						<label htmlFor="skillLevel" className="block font-medium mb-1">
							Skill level
						</label>
						<input
							type="text"
							id="skillLevel"
							className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter your maximum grade"
							onInput={handleNumberInputChange}
						/>
					</div>

					<div className="mb-6">
						<label htmlFor="file" className="block font-medium mb-1">
							Upload an image of the boulder problem
						</label>
						<input type="file" id="file" className="w-full py-2" />
					</div>

					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
					>
						Submit
					</button>
				</form>
			</div>
		</div>

	);

};
