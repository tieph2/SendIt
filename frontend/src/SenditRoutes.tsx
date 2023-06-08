import { CreateProfile } from "@/Components/CreateProfile.tsx";
import { Home } from "@/Components/HomePage.tsx";
import { BoulderPage} from "@/Components/BoulderPage.tsx";
import { ProtectedRoute } from "@/Components/ProtectedRoute.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import { LoginButton } from "@/Components/LoginButton.tsx";
import { LogoutButton } from "@/Components/LogoutButton.tsx";
import { CreateBoulder } from "@/Components/CreateBoulder.tsx";
import Header from "@/Components/Header.tsx";
import { Judge } from "@/Components/Judge.tsx";
import "@css/main.css";


export function SenditRouter() {
	const auth = useAuth0();

	return (
		<div className={"SenditFancy"}>
			<Header/>
			<main className="main">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/judge" element={<Judge />} />
					<Route path="/profile/edit" element={<ProtectedRoute><CreateProfile/></ProtectedRoute>} />
					<Route path="/boulders/create" element={<ProtectedRoute><CreateBoulder/></ProtectedRoute>} />
					<Route path="/login" element={<LoginButton />} />
					<Route path="/logout" element={<LogoutButton />} />
					<Route path="/boulders" element={<BoulderPage />} />
				</Routes>
			</main>

		</div>
	);
}

