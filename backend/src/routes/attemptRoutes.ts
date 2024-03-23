import { FastifyInstance } from "fastify";
import { Attempt } from "../db/entities/Attempt.js";
import { User } from "../db/entities/User.js";
import { Boulder } from "../db/entities/Boulder.js";
import { ICreateAttemptBody, IUpdateAttemptBody, ResultBody } from "../types";

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

			// Initialize an empty object to store boulders grouped by climber
			const bouldersByClimber = {};

			// Iterate over each Attempt object in the array, sort the attempt based on climber ID
			successfulAttempts.forEach(attempt => {
				const climberId = attempt.climber.id; // Assuming climber ID is accessible like this
				const boulderId = attempt.boulder.id; // Assuming boulder ID is accessible like this

				// If the climber does not have an entry in the bouldersByClimber object, initialize it as an empty array
				if (!bouldersByClimber[climberId]) {
					bouldersByClimber[climberId] = [];
				}

				// Push the current boulder ID into the array associated with the climber
				bouldersByClimber[climberId].push(boulderId);
			});

			//Array to store each climber's information
			const result: ResultBody[] = [];

			//Calculate the score for each climber
			for (const climberId in bouldersByClimber) {
				const theUser = await req.em.findOne(User, Number(climberId));
				const boulderIdList = bouldersByClimber[climberId];
				let score: number = 0;
				for (const boulderId of boulderIdList) {
					const theBoulder = await req.em.findOne(Boulder, boulderId);
					score += theBoulder.score;
				}

				result.push({
					id: theUser.id,
					name: theUser.name,
					uri: theUser.imgUri,
					score: score,
				});
			}

			//Sort the result based on descending score
			const resSorted = result.sort((a, b) => b.score - a.score);
			reply.send(resSorted);
		} catch (error) {
			reply.status(500).send("An error occurred while processing the request.");
		}
	});

	//Create an attempt between a climber and a boulder
	app.post<{ Body: ICreateAttemptBody }>("/attempts", async (req, reply) => {
		const { climberId, boulderId, successful } = req.body;

		try {
			// This is a pure convenience so we don't have to keep passing User to req.em.find
			const userRepository = req.em.getRepository(User);
			const boulderRepository = req.em.getRepository(Boulder);

			const climber = await userRepository.getReference(climberId);
			const boulder = await boulderRepository.getReference(boulderId);

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
	app.search<{ Body: { climberId: number } }>("/attempts/climber", async (req, reply) => {
		const { climberId: climberId } = req.body;

		try {
			const climberEntity = await req.em.getReference(User, climberId);
			const attempt = await req.em.find(Attempt, { climber: climberEntity });
			return reply.send(attempt);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	//Update attempt
	app.put<{ Body: IUpdateAttemptBody }>("/attempts", async (req, reply) => {
		const { climberId, boulderId, successful } = req.body;

		const attemptToChange = await req.em.findOne(Attempt, {
			climber: climberId,
			boulder: boulderId,
		});

		const newAttempt = {
			climber: climberId,
			boulder: boulderId,
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
