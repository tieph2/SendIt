import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import app from "./app.js";
import { Match } from "./db/entities/Match.js";
import { Message } from "./db/entities/Message.js";
import { User } from "./db/entities/User.js";
import { ICreateUserBody, IcreateMessageBody } from "./types.js";
import { LanguageFilter } from "./language_filter.js";

/**  This function creates all ackend routes for the site
 *
 * @param {FastifyInstance} app - the bas Fastify listen server instance
 * @param {{}}_options = Fastify instance options (Optional)
 * @returns {Promise<void>>} - Returns all of the initialized routes
 */
async function DoggrRoutes(app: FastifyInstance, _options = {}) {
	const lf = await LanguageFilter();

	if (!app) {
		throw new Error("Fasityf instance has no value during routes construction");
	}

	app.get("/hello", async (request: FastifyRequest, reply: FastifyReply) => {
		return "Hello";
	});

	app.get("/dbTest", async (request: FastifyRequest, reply: FastifyReply) => {
		return request.em.find(User, {});
	});

	//CRUD

	//C
	app.post<{ Body: ICreateUserBody }>("/users", async (req, reply) => {
		const { name, email, petType } = req.body;
		try {
			const newUser = await req.em.create(User, {
				name,
				email,
				petType,
			});

			await req.em.flush();
			console.log("Created new user:", newUser);
			return reply.send(newUser);
		} catch (err) {
			console.log("Failed to create new user", err.message);
			return reply.status(500).send({ message: err.message });
		}
	});

	//R
	app.search("/users", async (req, reply) => {
		const { email } = req.body;

		try {
			const theUser = await req.em.findOne(User, { email });
			console.log(theUser);
			reply.send(theUser);
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});

	//U
	app.put<{ Body: ICreateUserBody }>("/users", async (req, reply) => {
		const { name, email, petType } = req.body;
		const userToChange = await req.em.findOne(User, { email });
		userToChange.name = name;
		userToChange.petType = petType;

		await req.em.flush();
		console.log(userToChange);
		reply.send(userToChange);
	});

	//D

	app.delete<{ Body: { email: string; password: string } }>("/users", async (req, reply) => {
		const { email, password } = req.body;

		try {
			if (password == process.env.ADMIN_PASS) {
				const theUser = await req.em.findOne(
					User,
					{ email },
					{
						populate: [
							// Collection names in User.ts
							"matches",
							"matched_by",
							"sent_messages",
							"received_messages",
						],
					}
				);
				await req.em.remove(theUser).flush();
				console.log(theUser);
				reply.send(theUser);
			} else {
				reply.status(401).send();
			}
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});

	// CREATE MATCH ROUTE
	app.post<{ Body: { email: string; matchee_email: string } }>("/match", async (req, reply) => {
		const { email, matchee_email } = req.body;

		try {
			// make sure that the matchee exists & get their user account
			const matchee = await req.em.findOne(User, { email: matchee_email });
			// do the same for the matcher/owner
			const owner = await req.em.findOne(User, { email });

			//create a new match between them
			const newMatch = await req.em.create(Match, {
				owner,
				matchee,
			});

			//persist it to the database
			await req.em.flush();
			// send the match back to the user
			return reply.send(newMatch);
		} catch (err) {
			console.error(err);
			return reply.status(500).send(err);
		}
	});

	//Message Routes

	app.post<{ Body: { sender: string; receiver: string; message: string } }>(
		"/messages",
		async (req, reply) => {
			const { sender, receiver, message } = req.body;

			try {
				// make sure that the matchee exists & get their user account
				const receiverUser = await req.em.findOne(User, { email: receiver });
				// do the same for the matcher/owner
				const senderUser = await req.em.findOne(User, { email: sender });

				lf.filter(message);

				//create a new message between them
				const newMessage = await req.em.create(Message, {
					sender: senderUser,
					receiver: receiverUser,
					message: message,
				});

				//persist it to the database
				await req.em.flush();
				// send the match back to the user
				return reply.send(newMessage);
			} catch (err) {
				console.error(err.message);
				return reply.status(500).send(err);
			}
		}
	);

	//READ all messages sent to a user
	app.search<{ Body: { receiver: string } }>("/messages", async (req, reply) => {
		const { receiver } = req.body;

		try {
			const user = await req.em.findOne(User, { email: receiver });
			const userID = user.id;
			const messages = await req.em.find(Message, { receiver: userID });
			console.log(messages);
			reply.send(messages);
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});

	//READ all messages sent to a user
	app.search<{ Body: { sender: string } }>("/messages/sent", async (req, reply) => {
		const { sender } = req.body;

		try {
			const user = await req.em.findOne(User, { email: sender });
			const userID = user.id;
			const messages = await req.em.find(Message, { sender: userID });
			console.log(messages);
			reply.send(messages);
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});

	//UPDATE a message that a user sent
	app.put<{ Body: { messageId; message } }>("/messages", async (req, reply) => {
		const { messageId, message } = req.body;
		const messageToChange = await req.em.findOne(Message, { id: messageId });
		messageToChange.message = message;

		await req.em.flush();
		console.log(messageToChange);
		reply.send(messageToChange);
	});

	//DELETE a single message
	app.delete<{ Body: { messageId: number; password: string } }>("/messages", async (req, reply) => {
		const { messageId, password } = req.body;

		try {
			if (password == process.env.ADMIN_PASS) {
				const theMessage = await req.em.findOne(Message, { id: messageId });
				await req.em.remove(theMessage).flush();
				console.log(theMessage);
				reply.send(theMessage);
			} else {
				reply.status(401).send();
			}
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});

	//DELETE all messages from a user
	app.delete<{ Body: { sender: string; password: string } }>(
		"/messages/all",
		async (req, reply) => {
			const { sender, password } = req.body;

			try {
				if (password == process.env.ADMIN_PASS) {
					const theUser = await req.em.findOne(User, { email: sender });
					const userID = theUser.id;
					const messages = await req.em.find(Message, { sender: userID });
					req.em.remove(messages).flush();
					reply.send(messages);
				} else {
					reply.status(401).send();
				}
			} catch (err) {
				console.error(err);
				reply.status(500).send(err);
			}
		}
	);
}

export default DoggrRoutes;
