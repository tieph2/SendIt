import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProtectedRoute = ({children}) => {
	const {isAuthenticated, getAccessTokenSilently} = useAuth0();
	const [token, setToken] = useState("");


	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return children;
};
