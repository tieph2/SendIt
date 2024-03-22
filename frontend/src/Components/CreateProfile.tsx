import { httpClient } from "@/Services/HttpClient.tsx";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export enum SubmissionStatus {
	NotSubmitted,
	SubmitFailed,
	SubmitSucceeded,
}

export const CreateProfile = () => {
	const { user } = useAuth0();
	const [selectedFile, setSelectedFile] = useState();
	const [name, setName] = useState("");
	const [level, setLevel] = useState(0);
	const [submitted, setSubmitted] = useState(SubmissionStatus.NotSubmitted);

	const onFileChange = (ev) => {
		setSelectedFile(ev.target.files[0]);
	};

	const handleNumberInputChange = (e) => {
		// Update the input value by removing any
		// non-digit characters from the input value
		e.target.value = e.target.value.replace(/\D/g, "");
		setLevel(e.target.value);
	};

	const onUploadFile = () => {
		const formData = new FormData();
		formData.append("email", user.email);
		formData.append("name", name);
		formData.append("skillLevel", level.toString());
		formData.append("file", selectedFile);

		// @ts-ignore
		formData.append("fileName", selectedFile.name);

		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};

		httpClient.post("/users", formData, config).then((response) => {
			console.log("Got response from uploading file", response.status);
			if (response.status === 200) {
				setSubmitted(SubmissionStatus.SubmitSucceeded);
			} else {
				setSubmitted(SubmissionStatus.SubmitFailed);
				console.log("Submission failed");
			}
		});
	};

	return (
		<div className="createBoulderPage">
			<div className="max-w-md mx-auto mt-4 p-6 bg-white rounded-md shadow-md">
				<h2 className="text-2xl font-bold mb-6">Register for the competition</h2>

				<div className="mb-6">
					<label htmlFor="name" className="block font-medium mb-1">
						Name
					</label>
					<input
						type="text"
						id="name"
						className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Your name"
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

				<div className="mb-6">
					<label htmlFor="skill" className="block font-medium mb-1">
						Skill level
					</label>
					<input
						type="text"
						id="skill"
						className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter a number"
						onInput={handleNumberInputChange}
					/>
				</div>

				<div className="mb-6">
					<label htmlFor="boulderpic" className="block font-medium mb-1">
						Upload a profile picture!
					</label>
					<input
						type="file"
						id="boulderpic"
						className="w-full py-2"
						name="boulderpic"
						accept={"image/png, image/jpeg"}
						onChange={onFileChange}
					/>
				</div>

				<button
					type="submit"
					className="btn btn-primary w-full bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
					onClick={onUploadFile}
				>
					Submit
				</button>
				{submitted === SubmissionStatus.SubmitFailed && (
					<h3 className="text-red-500 text-center">Error. Could not register climber!</h3>
				)}
				{submitted === SubmissionStatus.SubmitSucceeded && (
					<h3 className="text-green-500 text-center">You are signed up for the competition!</h3>
				)}
			</div>
		</div>
	);
};
