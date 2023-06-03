import { SenditRouter } from "@/SenditRoutes.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { Link, Route, Routes, Router, BrowserRouter } from "react-router-dom";
import "@css/main.css";

// This is our base React Component
export function App() {
	return (
		<BrowserRouter>
				<div className="Sendit">
					<SenditRouter/>
				</div>
		</BrowserRouter>
	);
}

export default App;





