import Fastify from "fastify";
import multipart from "@fastify/multipart";
import config from "./db/mikro-orm.config.js";
import cors from "@fastify/cors";
import { FastifySearchHttpMethodPlugin } from "./plugins/http_search.js";
import { FastifyMikroOrmPlugin } from "./plugins/mikro.js";
import SenditRoutes from "./routes/routes.js";
import { AuthPlugin } from "./plugins/auth.js";

const app = Fastify();

await app.register(cors, {
	origin: (origin, cb) => {
		cb(null, true);
	},
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "SEARCH"],
});

await app.register(multipart);
await app.register(FastifyMikroOrmPlugin, config);
await app.register(FastifySearchHttpMethodPlugin);
await app.register(AuthPlugin);
await app.register(SenditRoutes);

export default app;
