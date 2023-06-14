import { RegistrationType, Color } from "@/SenditTypes.ts";
import "@css/main.css";

export type CurrentRegistrationProps = RegistrationType & {
	onPassButtonClick: () => void;
	onFailButtonClick: () => void;
};

export function CurrentRegistration(props: CurrentRegistrationProps) {
	const { imgUri, name, skill_level } = props;
	const { boulder_id, boulderImgUri, zone, color, score, grade, note } = props;
	const { onPassButtonClick, onFailButtonClick } = props;
	const profilePicURl = "http://localhost:9000/sendit/" + imgUri;
	const boulderPicURL = "http://localhost:9000/sendit/" + boulderImgUri;

	return (
		<div className={"flex flex-col items-center"}>
			<h4>You are judging at</h4>
			<h1>Zone {zone}</h1>
			<div className="m-8 bg-white rounded-md shadow-md flex flex-col md:flex-row md:w-1/2">
				{/* Climber Profile */}
				<div className="md:w-1/2 md:pr-4 p-4">
					<div className="flex flex-col items-center mb-4">
						<img
							src={profilePicURl}
							alt="Climber Profile"
							className="w-12 h-12 rounded-full mr-2"
						/>
						<div>
							<h3 className="text-lg font-semibold">{name}</h3>
							<p className="text-gray-500">Skill Level: {skill_level}</p>
						</div>
					</div>
					<div className={"space-x-8 my-1 flex justify-center"}>
						<button className="btn " onClick={onPassButtonClick}>
							Pass
						</button>
						<button className="btn " onClick={onFailButtonClick}>
							Fail
						</button>
					</div>
				</div>

				{/* Line separator */}
				<div className="border-t border-gray-300 my-4"></div>

				{/* Boulder Problem Profile */}
				<div
					className="boulder-bg md:w-1/2 md:pl-4 p-4"
					style={{
						backgroundImage: `linear-gradient(184deg, rgba(2,0,36,1) 0%, rgba(1,6,22,0.5) 63%, rgba(3,24,59,0.5) 100%), url(${boulderPicURL})`,
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
					}}
				>
					<div className="flex flex-col items-center mb-4">
						<div className={"flex flex-col gap-1"}>
							<h3 className="text-lg font-semibold">Attempting: boulder {boulder_id}</h3>
							<p className=""> Color {color}</p>
							<div
								className={"boulderColorBlock"}
								style={{
									backgroundColor: `${Color[color]}`,
								}}
							></div>
							<p className="">Score {score}</p>
							<p className="">Grade V{grade}</p>
							<p className="">Note: {note}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
