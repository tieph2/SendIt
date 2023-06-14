import { BoulderType, Color } from "@/SenditTypes.ts";
import { Queue } from "@/Components/Queue.tsx";
import { EnQueue } from "@/Services/QueueService.tsx";

export function BoulderCard(props: BoulderType & { user_id }) {
	const { id, imgUri, zone, color, score, grade, note } = props;
	const user_id = props.user_id;
	const minioUrl = `http://localhost:9000/sendit/${imgUri}`;

	const onRegisterButtonClick = () => {
		EnQueue.send(user_id, id)
			.catch((err) => console.log(err));
	};

	return (
		<div className="card  m-4 bg-base-100 shadow-xl mt-6">
			<figure className="cardImageContainer">
				<img src={minioUrl} alt="Image for boulder problem" className="cardImg" />
			</figure>
			<div className="card-body">
				<h2 className="card-title">Boulder {id}</h2>
				<p>Zone {zone}</p>
				<p>Score {score}</p>
				<p>Grade {grade}</p>

				<div
					className={"boulderColorBlock"}
					style={{
						backgroundColor: `${Color[color]}`,
						color: "white",
						textAlign: "center",
						lineHeight: "1.5",
					}}
				>
					{" "}
					{color}
				</div>
				<p>
					Note:
					<br />
					{note}
				</p>

				<h4> Current lineup</h4>
				<Queue boulder_id={id} />
				{user_id ? (
					<div className="card-actions justify-start">
						<button className="btn btn-primary" onClick={onRegisterButtonClick}>
							Climb
						</button>
					</div>
				) : null}
			</div>
		</div>
	);
}
