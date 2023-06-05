import { SenditRouter } from "@/SenditRoutes.tsx";
import { BrowserRouter } from "react-router-dom";
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





