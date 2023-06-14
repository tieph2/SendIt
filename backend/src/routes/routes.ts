import dotenv from "dotenv";
dotenv.config();

import { FastifyInstance } from "fastify";
import { UserRoutesInit } from "./user_routes.js";
import { BoulderRoutesInit } from "./boulder_routes.js";
import { AttemptRouteInit } from "./attempt_routes.js";
import { RegistrationRouteInit } from "./register_routes.js";

/** This function creates all backend routes for the site
 *
 * @param {FastifyInstance} app - The base Fastify listen server instance
 * @param {{}} _options - Fastify instance options (Optional)
 * @returns {Promise<void>} - Returns all of the initialized routes
 */
async function SenditRoutes(app: FastifyInstance, _options = {}) {
	if (!app) {
		throw new Error("Fastify instance has no value during routes construction");
	}

	UserRoutesInit(app);
	BoulderRoutesInit(app);
	AttemptRouteInit(app);
	RegistrationRouteInit(app);
}

export default SenditRoutes;
