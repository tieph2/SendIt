import landing from '../assets/images/landing.jpg';
import { Link } from "react-router-dom";
import { useAuth } from "@/Services/Auth.tsx";
import {AuthContextProps} from "@/Services/Auth.tsx";
import { getIdFromServer } from "@/Services/HttpClient.tsx";
import { useEffect, useState } from "react";
import { isCSSRequest } from "vite";


export const Home = () => {
	console.log("refreshing home");
	const auth = useAuth();
	// const id = auth.getId();
	const [registered, setRegistered] = useState(false);

	useEffect(() => {
	  const checkRegistered = async () => {
	    const id = await getIdFromServer();
			//@ts-ignore
	    id ? setRegistered(true) : setRegistered(false);
			console.log("Refreshed home component");
	  };

	  checkRegistered().then((value) => {
			console.log("Email checked");
	  });
	});

	return (
		<div className="container">

		<div className={"homePage flex flex-row gap-6 justify-center items-center h-screen"}>
			<div className="hero-img"></div>
			<div className={"hero-content flex flex-col items-start"}>
				<h1 className="hero-header">Conquer the wall!</h1>
				<IntroCard/>
				{registered ?
					<p>You are registered. Have fun!</p>
				:
					<>
						<p>You are not registered for the competition</p>
						<Link to={"/profile/edit"}>
							<div
								className={"btn btn-primary blue"}
								>
								Register Now
							</div>

						</Link>
					</>


				}
			</div>
		</div>
		</div>
	);
};


export function Subtitle() {
	return <h3>Ascending with style</h3>;
}

export function Intro() {
	return <p>And send it!  Welcome to the official website for Portland State Annual Community Bouldering Competition. Sign up for boulder, and wait for your turn. May the best climber wins.</p>;
}

export function IntroCard(){
	return (
			<div className="card w-96 bg-white shadow-xl mt-6  p-6 flex flex-column justify-between leading-normal">
				<div className="mb-8">
					<Intro/>
				</div>
				<div className="flex items-center">
					<img className="w-10 h-10 rounded-full mr-4 intro-image" src={landing} alt="Tien climbing a the wall" />
					<div className="text-sm">
						<p className="text-gray-900 leading-none">Tien Pham</p>
						<p className="text-gray-600">{new Date().toLocaleDateString('en-us')}</p>
					</div>
				</div>
			</div>
	);
}

