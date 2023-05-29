import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { User } from "./db/entities/User.js";
import { FastifyBadWordsPlugin } from "./plugins/badwords.js";
import multipart from "@fastify/multipart";
import config from "./db/mikro-orm.config.js";
import cors from '@fastify/cors'
import { FastifySearchHttpMethodPlugin } from "./plugins/http_search.js";
import { FastifyMikroOrmPlugin } from "./plugins/mikro.js";
import SenditRoutes from "./routes/routes.js";
import { AuthPlugin } from "./plugins/auth";

const app = Fastify();

await app.register(cors, {
  origin: (origin, cb) => {
    cb(null, true);
  }
});

await app.register(multipart);
await app.register(FastifyMikroOrmPlugin, config);
await app.register(FastifySearchHttpMethodPlugin);
await app.register(AuthPlugin);

await app.register(SenditRoutes);
export default app;
