import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { SOFT_DELETABLE_FILTER } from "mikro-orm-soft-delete";
import { User, UserRole } from "../db/entities/User.js";
import { ICreateUsersBody, IUpdateUsersBody } from "../types.js";
import { UploadFileToMinio } from "../plugins/minio.js";
import "fastify-auth0-verify";

/** This function creates all the backend routes for users of the application
 *
 * @param {FastifyInstance} app
 * @constructor
 */
export function UserRoutesInit(app: FastifyInstance) {
	// Route that returns all users, soft deleted and not
	app.get("/dbTest", async (request: FastifyRequest, _reply: FastifyReply) => {
		return request.em.find(User, {}, { filters: { [SOFT_DELETABLE_FILTER]: false } });
	});

	// Route that returns all users who ARE NOT SOFT DELETED
	app.get("/users", async (req, reply) => {
		try {
			const theUser = await req.em.find(User, {});
			reply.send(theUser);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	app.get("/user", { onRequest: [app.auth] }, async (req, reply) => {
		try {
			const token = await req.jwtVerify();
			//@ts-ignore
			const email = token["https://www.archivalight.com/email"];

			const theUser = await req.em.find(User, { email });
			reply.send(theUser);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	// Route that returns all judges
	app.get("/users/judges", async (req, reply) => {
		try {
			const theUser = await req.em.find(User, { role: UserRole.JUDGE });
			reply.send(theUser);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	//READ
	app.search("/users", async (req, reply) => {
		const { email } = req.body;

		try {
			const theUser = await req.em.findOneOrFail(User, { email: email });
			reply.send(theUser.id);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	// Route that updates a user's skill level
	app.put<{ Body: IUpdateUsersBody }>("/users", async (req, reply) => {
		const { name, id, skillLevel } = req.body;

		const userToChange = await req.em.findOneOrFail(User, id, { strict: true });
		userToChange.name = name;
		userToChange.skillLevel = skillLevel;

		// Reminder -- this is how we persist our JS object changes to the database itself
		await req.em.flush();
		reply.send(userToChange);
	});

	// Route that deletes a user
	app.delete<{ Body: { myId: number; IdToDelete: number } }>("/users", async (req, reply) => {
		const { myId, IdToDelete } = req.body;

		try {
			// Authenticate my user's role
			const me = await req.em.findOneOrFail(User, myId, { strict: true });

			// Make sure the requester is an Admin
			if (me.role === UserRole.USER) {
				return reply.status(401).send({ message: "You are not an admin!" });
			}

			const theUserToDelete = await req.em.findOneOrFail(User, IdToDelete, { strict: true });

			//Make sure the to-be-deleted user isn't an admin
			if (theUserToDelete.role === UserRole.ADMIN) {
				return reply
					.status(401)
					.send({ message: "You do not have enough privileges to delete an Admin!" });
			}

			await req.em.remove(theUserToDelete).flush();
			return reply.send(theUserToDelete);
		} catch (err) {
			return reply.status(500).send(err);
		}
	});

	// Routes that create a new user profile
	app.post<{ Body: ICreateUsersBody }>("/users", async (req, reply) => {
		try {
			const data = await req.file();

			const body = Object.fromEntries(
				// @ts-ignore
				Object.keys(data.fields).map((key) => [key, data.fields[key].value])
			);
			const { email, name, skillLevel } = body;
			await UploadFileToMinio(data);

			const newUser = await req.em.create(User, {
				name,
				email,
				skillLevel,
				imgUri: data.filename,
				// We'll only create Admins manually!
				role: UserRole.USER,
			});

			await req.em.flush();
			return reply.send(newUser);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	//Route that gets a random user
	app.get("/profile", async (req, reply) => {
		const userRepo = req.em.getRepository(User);
		const totalCount = await userRepo.count();
		const randomOffset = Math.floor(Math.random() * totalCount);
		const randomEntity = await userRepo.findOne({}, { offset: randomOffset });
		reply.send(randomEntity);
	});
}
