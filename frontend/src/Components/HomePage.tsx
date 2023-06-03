import landing from '../assets/images/landing.jpg';



export const Home = () => {
	return (
		<div className={"homePage flex justify-center items-center h-screen"}>
			<IntroCard/>
		</div>
	);
};

export function Title() {
	return <h1>Sendit</h1>;
}

export function Subtitle() {
	return <h3>Ascending with style</h3>;
}

export function Intro() {
	return <p>Welcome to Sendit, the official website for Portland State Annual Community Bouldering Competition. Sign up for boulder, and wait for your turn. May the best climber wins.</p>;
}

export function IntroCard(){
	return (
			<div className="w-full sm:w-1/2 lg:w-1/2 bg-gray-200  rounded-3xl m-md border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400  p-6 flex flex-col justify-between leading-normal">
				<div className="mb-8">
					<Title/>
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

