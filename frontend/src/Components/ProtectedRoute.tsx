import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProtectedRoute = ({children}) => {
	const {getAccessTokenSilently} = useAuth0();
	const [token, setToken] = useState("");

	useEffect(() => {
		const getToken = async () => {
			const token = await getAccessTokenSilently();
			return token;
		};

		getToken().then((value) => {
			setToken(value);
			console.log(token);
		});
	});

	if (!token) {
		return <Navigate to="/login" replace />;
	}
	else {
		console.log(token);
	}

	return children;
};
