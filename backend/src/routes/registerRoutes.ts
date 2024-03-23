import { FastifyInstance } from "fastify";
import { User } from "../db/entities/User.js";
import { Boulder } from "../db/entities/Boulder.js";
import { RegistrationBody } from "../types";
import { Registration } from "../db/entities/Registration.js";

/** This function creates all the backend routes for boulder registrations by climbers
 *
 * @param {FastifyInstance} app
 * @constructor
 */
export function RegistrationRouteInit(app: FastifyInstance) {
	// Route that returns all users who ARE NOT SOFT DELETED
	app.get("/registration", async (req, reply) => {
		try {
			const allRegistrations = await req.em.find(Registration, {});
			reply.send(allRegistrations);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	app.search("/registration", async (req, reply) => {
		const { boulder } = req.body;
		try {
			const boulderEntity = await req.em.getReference(Boulder, boulder);
			const registrations = await req.em.find(Registration, { boulder: boulderEntity });

			const users = await Promise.all(
				registrations.map((registration) => {
					return req.em.find(User, { id: registration.climber });
				})
			);

			return reply.send(users);
		} catch (err) {
			return reply.status(500).send(err);
		}
	});

	//Create a registration between a climber and a boulder
	app.post<{ Body: RegistrationBody }>("/registration", async (req, reply) => {
		const { climberId, boulderId } = req.body;

		try {
			// This is a pure convenience so we don't have to keep passing User to req.em.find
			const userRepository = req.em.getRepository(User);
			const boulderRepository = req.em.getRepository(Boulder);

			const climber = await userRepository.getReference(climberId);
			const boulder = await boulderRepository.getReference(boulderId);

			const newAttempt = await req.em.create(Registration, {
				climber: climber,
				boulder: boulder,
			});
			// Send our changes to the database
			await req.em.flush();

			// Let the user know everything went fine
			return reply.send(newAttempt);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	//Delete registration
	app.delete<{ Body: RegistrationBody }>("/registration", async (req, reply) => {
		const { climberId, boulderId } = req.body;
		console.log("Deleting");

		try {
			const registration = await req.em.findOneOrFail(Registration, {
				climber: climberId,
				boulder: boulderId,
			});
			await req.em.remove(registration).flush();
			return reply.send(registration);
		} catch (err) {
			return reply.status(500).send(err);
		}
	});

	// Fastify route handler
	app.search("/registration/top", async (req, reply) => {
		const { zone } = req.body;

		try {
			// Query Boulders by zone
			const boulders = await req.em.find(Boulder, { zone });

			if (boulders.length === 0) {
				return reply.status(404).send("No boulders found in the specified zone.");
			}

			// Get the oldest Registration for a Boulder in the specified zone
			const oldestRegistration = await req.em.findOne(
				Registration,
				{ boulder: { $in: boulders } },
				{ orderBy: { createdAt: "ASC" } }
			);

			if (!oldestRegistration) {
				reply.status(404).send("No registrations found for the boulders in the specified zone.");
				return null;
			}

			// Query User and Boulder using climberID and boulderID from the oldest registration
			const user = await req.em.findOne(User, { id: oldestRegistration.climber });
			const boulder = await req.em.findOne(Boulder, { id: oldestRegistration.boulder });

			const result = {
				imgUri: user.imgUri,
				name: user.name,
				skillLevel: user.skillLevel,
				id: user.id,
				boulderId: boulder.id,
				boulderImgUri: boulder.imgUri,
				zone: boulder.zone,
				color: boulder.color,
				score: boulder.score,
				grade: boulder.grade,
				note: boulder.note,
			};

			return reply.send(result);
		} catch (error) {
			return reply.status(500).send("An error occurred while processing the request.");
		}
	});
}
