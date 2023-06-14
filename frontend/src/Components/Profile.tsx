import { ProfileType } from "@/SenditTypes.ts";
import "@css/main.css";

export type ProfileProps = ProfileType & {
	onPassButtonClick: () => void;
	onFailButtonClick: () => void;
};

export function Profile(props: ProfileProps) {
	const { imgUri, name, onPassButtonClick, onFailButtonClick } = props;

	const minioUrl = "http://localhost:9000/sendit/" + imgUri;

	return (
		<div className={"profileCard flex flex-col"}>
			<h1 className={"text-center"}> Current climber</h1>
			<div className="bg-white shadow-lg rounded-lg items-center mx-auto overflow-hidden w-72 md:w-40 md:h-56 lg:w-56 lg:h-72">
				<img className="rounded w-128 h-128" src={minioUrl} alt="Profile of pet" />
				<h2 className={"text-4xl text-blue-600"}>{name}</h2>
			</div>

			<div className="bg-white shadow-lg rounded-lg items-center mx-auto overflow-hidden w-72 md:w-40 md:h-56 lg:w-56 lg:h-72">
				<div className="h-32 md:h-40 lg:h-48">
					<img className="object-cover h-full w-full" src={minioUrl} alt="Profile Picture" />
				</div>
				<div className="px-6 py-4">
					<div className="font-bold text-xl mb-2">John Doe</div>
					<p className="text-gray-700 text-base mb-2">Skill Level: Intermediate</p>
					<p className="text-gray-700 text-base">Boulder: V3</p>
				</div>
			</div>
			<div className={"space-x-8 my-1"}>
				<button className="btn btn-circle" onClick={onPassButtonClick}>
					Pass
				</button>
				<button className="btn btn-circle" onClick={onFailButtonClick}>
					Fail
				</button>
			</div>
		</div>
	);
}
