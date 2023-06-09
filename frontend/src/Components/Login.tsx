import { useCallback, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "@/Components/LoginButton.tsx";


export function Login() {
	return (
		<div className={"w-1/2 my-8 mx-auto flex flex-col justify-center"}>
			<h1 className={"text-center"}>You must be logged in to view this page</h1>
			<LoginButton/>
		</div>
	);
}
