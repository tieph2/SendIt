import landing from '../assets/images/landing.jpg';



export const Home = () => {
	return (
		<div className={"homePage flex flex-row gap-6 justify-center items-center h-screen"}>
			<div className="hero-img w-96"></div>
			<div className={"hero-content flex flex-col items-start w-96"}>
				<h1 className="hero-header">Conquer the wall!</h1>
				<IntroCard/>
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

