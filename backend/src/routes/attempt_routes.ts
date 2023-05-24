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
	/////////////////////////////////////////////////////////////////////////////
	// HOMEWORK 1
	/////////////////////////////////////////////////////////////////////////////

	/* This is where we have to be careful with the difference in a full entity
   vs a reference.  References are a Mikro-orm optimization that lets us avoid database
   queries when all we need from something is its id.  That is the case here:
   we only *need* references to these Users, not their entire data.  We don't actually care
   about any of their data except their ID, so we would like to use references here.
   Unfortunately, we're currently tracking users by their email address, not their database id!

   This is a situation where you have a choice to make.  Either we refactor a bit
   now to start using `id` everywhere rather than email address (since THAT is the field
   that links tables together in our database, not email...or we give up forever
   on enabling LOTS of optimizations.  My personal choice is to refactor, so
   the final code solution I merge into our official Doggr repo will be one
   that fixes this problem.  We'll do it the simpler way for this solution
   and take what we need from the database at any cost.
   */

	// Route that returns all users who ARE NOT SOFT DELETED
	app.get("/attempts", async (req, reply) => {
		try {
			const allAttempts = await req.em.find(Attempt, {});
			reply.send(allAttempts);
		} catch (err) {
			reply.status(500).send(err);
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
				count: 0,
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

		const attemptToChange = await req.em.findOneOrFail(Attempt, {
			climber: climber_id,
			boulder: boulder_id,
		});
		attemptToChange.successful = successful;
		attemptToChange.count++;

		// Reminder -- this is how we persist our JS object changes to the database itself
		await req.em.flush();
		reply.send(attemptToChange);
	});
}
