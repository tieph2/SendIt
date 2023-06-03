import landing from '../assets/images/landing.jpg';



export const Home = () => {
	return (
		<div className={"homePage flex justify-center items-center h-screen"}>
			<IntroCard/>
		</div>
	);
};

export function Title() {
	return <h1>Send it!</h1>;
}

export function Subtitle() {
	return <h3>Ascending with style</h3>;
}

export function Intro() {
	return <p>Welcome to Sendit, the official website for Portland State Annual Community Bouldering Competition. Sign up for boulder, and wait for your turn. May the best climber wins.</p>;
}

export function IntroCard(){
	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content text-center">
				<div className="max-w-md">
					<h1 className="text-5xl font-bold">Hello there</h1>
					<p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
					<button className="btn btn-primary">Get Started</button>
				</div>
			</div>
		</div>
	);
}

