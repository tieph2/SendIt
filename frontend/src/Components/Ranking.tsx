import { getRankingFromServer } from "@/Services/HttpClient.tsx";
import { useEffect, useState } from "react";

const minioUrl = `http://localhost:9000/sendit/`;

export const Ranking = () => {
	const [ranking, setRanking] = useState([]);

	const fetchRanking = () => {
		getRankingFromServer()
			.then((response) => setRanking(response))
			.catch((err) => console.log("Error in fetch ranking", err));
	};

	useEffect(() => {
		fetchRanking();
	}, []);

	return (
		<div className={""}>
			<h2>Current Ranking</h2>
			<div className={"card bg-base-100 shadow-md p-6"}>
				{ranking.map((item) => {
					return (
						<div className={"flex flex-row mx-2 my-2 "} key={item.id} {...item}>
							{" "}
							{item.id}
							<img className={"avatar-sm mx-1"} src={minioUrl + item.uri} alt={"Profile pic"} />
							<p>
								{item.name}:{item.score}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
