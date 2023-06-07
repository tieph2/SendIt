import { ProfileType } from "@/SenditTypes.ts";
import { useEffect } from "react";
import "@css/main.css";

export type ProfileProps = ProfileType & {
	onPassButtonClick: () => void;
	onFailButtonClick: () => void;
};

export function Profile(props: ProfileProps) {
	const { imgUri, name, petType, onPassButtonClick, onFailButtonClick } = props;

	const minioUrl = "http://localhost:9000/sendit/" + imgUri;

	return (
		<div className={"flex flex-col items-center rounded-box w-4/5 mx-auto"}>
			<img className="rounded w-128 h-128" src={minioUrl} alt="Profile of pet" />
			<h2 className={"text-4xl text-blue-600"}>{name}</h2>
			<div className={"text-2xl text-blue-300"}>Pet Type: {petType}</div>
			<div className={"space-x-8 my-1"}>
				<button className="btn btn-circle" onClick={onPassButtonClick}>Pass</button>
				<button className="btn btn-circle" onClick={onFailButtonClick}>Fail</button>
			</div>W
		</div>
	);
}
