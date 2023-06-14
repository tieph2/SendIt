import { FastifyInstance } from "fastify";
import { Attempt } from "../db/entities/Attempt.js";
import { User } from "../db/entities/User.js";
import { Boulder } from "../db/entities/Boulder.js";
import { ICreateAttemptBody, IUpdateAttemptBody } from "../types";

/** This function creates all the backend routes for climbing attempts by climbers
 *
 * @param {FastifyInstance} app
 * @constructor
 */
export function AttemptRouteInit(app: FastifyInstance) {
	// Route that returns all users who ARE NOT SOFT DELETED
	app.get("/attempts", async (req, reply) => {
		try {
			const allAttempts = await req.em.find(Attempt, {});
			reply.send(allAttempts);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	// Fastify route handler
	app.get("/ranking", async (req, reply) => {
		try {
			const successfulAttempts = await req.em.find(Attempt, { successful: true });

			// Group the attempts by climber_id
			//@ts-ignore
			const attemptsByClimber = successfulAttempts.reduce((acc, attempt) => {
				//@ts-ignore
				if (!acc[attempt.climber]) {
					//@ts-ignore
					acc[attempt.climber] = [];
				}
				//@ts-ignore
				acc[attempt.climber].push(attempt);
				return acc;
			}, {});

			const result = {};

			for (const attempt of attemptsByClimber["[object Object]"]) {
				const user_id = attempt.climber.id;
				const theUser = await req.em.findOne(User, user_id);
				let userInfo = {
					id: theUser.id,
					name: theUser.name,
					uri: theUser.imgUri,
					score: 0,
				};

				result[user_id] = userInfo;
			}

			for (const attempt of attemptsByClimber["[object Object]"]) {
				const boulder_id = attempt.boulder.id;
				const theBoulder = await req.em.findOne(Boulder, boulder_id);
				const score = theBoulder.score;
				result[attempt.climber.id].score += score;
			}

			const res = Object.values(result);
			//@ts-ignore
			const res_sorted = res.sort((a, b) => b.score - a.score);

			//@ts-ignore
			const sorted_result = Object.entries(result).sort((a, b) => b[1] - a[1]);
			reply.send(res_sorted);
		} catch (error) {
			reply.status(500).send("An error occurred while processing the request.");
		}
	});

	//Create an attempt between a climber and a boulder
	app.post<{ Body: ICreateAttemptBody }>("/attempts", async (req, reply) => {
		const { climber_id, boulder_id, successful } = req.body;

		try {
			// This is a pure convenience so we don't have to keep passing User to req.em.find
			const userRepository = req.em.getRepository(User);
			const boulderRepository = req.em.getRepository(Boulder);

			const climber = await userRepository.getReference(climber_id);
			const boulder = await boulderRepository.getReference(boulder_id);

			const newAttempt = await req.em.create(Attempt, {
				climber: climber,
				boulder: boulder,
				count: 1,
				successful: successful,
			});
			// Send our changes to the database
			await req.em.flush();

			// Let the user know everything went fine
			return reply.send(newAttempt);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	//Search for attempts from specific user
	app.search<{ Body: { climber_id: number } }>("/attempts/climber", async (req, reply) => {
		const { climber_id } = req.body;

		try {
			const climberEntity = await req.em.getReference(User, climber_id);
			const attempt = await req.em.find(Attempt, { climber: climberEntity });
			return reply.send(attempt);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	//Update attempt
	app.put<{ Body: IUpdateAttemptBody }>("/attempts", async (req, reply) => {
		const { climber_id, boulder_id, successful } = req.body;

		const attemptToChange = await req.em.findOne(Attempt, {
			climber: climber_id,
			boulder: boulder_id,
		});

		const newAttempt = {
			climber: climber_id,
			boulder: boulder_id,
			count: 0,
			successful: successful,
		};

		if (attemptToChange) {
			attemptToChange.successful = successful;
			attemptToChange.count++;
		} else {
			await req.em.create(Attempt, newAttempt);
		}

		// Reminder -- this is how we persist our JS object changes to the database itself
		await req.em.flush();
		reply.send(attemptToChange ? attemptToChange : newAttempt);
	});
}
