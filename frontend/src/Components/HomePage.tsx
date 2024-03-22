import landing from "../assets/images/landing.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "@/Services/Auth.tsx";
import {
	getIdFromServer,
	getJudgesFromServer
} from "@/Services/HttpClient.tsx";
import { useEffect, useState } from "react";

export const Home = () => {
	const minioUrl = "http://localhost:9000/sendit/";
	const [judges, setJudges] = useState([])
	const { getTokenAndInjectHeader } = useAuth();
	const [registered, setRegistered] = useState(false);

	const fetchJudges = () => {
		getJudgesFromServer()
			.then((response) => setJudges(response))
			.catch((err) => console.log("Error in fetch judges", err));
	};

	useEffect(() => {
		fetchJudges();
		console.log(judges);
	}, []);



	useEffect(() => {
		const checkRegistered = async () => {
			try {
				await getTokenAndInjectHeader();
				const id = await getIdFromServer();
				id ? setRegistered(true) : setRegistered(false);
				console.log("Refreshed home component");
				return id;
			} catch (error) {
				console.error(error);
			}
		};

		checkRegistered().finally(() => {
			console.log("Registered", registered);
		});
	}, [registered]);

	return (
		<div className="container">
			<div className={"homePage flex flex-row gap-6 justify-center items-center h-screen"}>
				<div className="hero-img"></div>
				<div className={"hero-content flex flex-col items-start"}>
					<h1 className="hero-header">Conquer the wall!</h1>
					<IntroCard />
					{registered ? (
						<p>You are registered. Have fun!</p>
					) : (
						<>
							<Link to={"/profile/edit"}>
								<div className={"btn btn-primary blue"}>Register Now</div>
							</Link>

							<div className={"JudgeList"}>
								<h2 className={"mb-4"}> Judge list</h2>

								{judges.map((judge) => {
									return (
										<div className={"flex"}>
											<img
												className={"avatar-sm mr-4"}
												src={minioUrl + judge.imgUri}
												alt={`Judge ${judge.name} profile pic`}
											/>
											<p>{judge.name}</p>
										</div>
									);
								})}
							</div>

						</>
					)}
				</div>
			</div>
		</div>
	);
};

export function Subtitle() {
	return <h3>Ascending with style</h3>;
}

export function Intro() {
	return (
		<p>
			And send it! Welcome to the official website for Portland State Annual Community Bouldering
			Competition. Sign up for boulder, and wait for your turn. May the best climber wins.
		</p>
	);
}

export function IntroCard() {
	return (
		<div className="card w-96 bg-white shadow-xl mt-6  p-6 flex flex-column justify-between leading-normal">
			<div className="mb-8">
				<Intro />
			</div>
			<div className="flex items-center">
				<img
					className="w-10 h-10 rounded-full mr-4 intro-image"
					src={landing}
					alt="Tien climbing a the wall"
				/>
				<div className="text-sm">
					<p className="text-gray-900 leading-none">Tien Pham</p>
					<p className="text-gray-600">{new Date().toLocaleDateString("en-us")}</p>
				</div>
			</div>
		</div>
	);
}
