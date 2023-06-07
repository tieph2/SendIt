import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { User } from "./db/entities/User.js";
import multipart from "@fastify/multipart";
import config from "./db/mikro-orm.config.js";
import cors from '@fastify/cors'
import { FastifySearchHttpMethodPlugin } from "./plugins/http_search.js";
import { FastifyMikroOrmPlugin } from "./plugins/mikro.js";
import SenditRoutes from "./routes/routes.js";

const app = Fastify();


app.register(import('fastify-auth0-verify'), {
  domain: process.env.AUTH0_DOMAIN,
  secret: process.env.AUTH0_SECRET
});

await app.register(cors, {
  origin: (origin, cb) => {
    cb(null, true);
  },
  methods: ['GET','POST','PUT','DELETE','PATCH','SEARCH'],
});

await app.register(multipart);
await app.register(FastifyMikroOrmPlugin, config);
await app.register(FastifySearchHttpMethodPlugin);

await app.register(SenditRoutes);
export default app;
