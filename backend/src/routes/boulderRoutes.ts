import { FastifyInstance } from "fastify";
import { Boulder } from "../db/entities/Boulder.js";
import { User, UserRole } from "../db/entities/User.js";
import { UploadFileToMinio } from "../plugins/minio.js";
import { ICreateBoulderBody, IUpdateBoulderBody } from "../types.js";


/** This function creates all the backend routes for boulder problems
 *
 * @param {FastifyInstance} app
 * @constructor
 */
export function BoulderRoutesInit(app: FastifyInstance) {

	// Route that gets all boulders in the database
	app.get("/boulders", async (req, reply) => {
		try {
			const theBoulder = await req.em.find(Boulder, {});
			reply.send(theBoulder);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	// Route that creates a boulder in the database
	app.post<{ Body: ICreateBoulderBody }>("/boulders", async (req, reply) => {
		try {
			const data = await req.file();

			const body = Object.fromEntries(
				// @ts-ignore
				Object.keys(data.fields).map((key) => [key, data.fields[key].value])
			);
			const { zone, grade, score, color, note } = body;
			await UploadFileToMinio(data);

			const newBoulder = await req.em.create(Boulder, {
				zone,
				color,
				score,
				grade,
				note,
				imgUri: data.filename,
			});

			await req.em.flush();
			return reply.send(newBoulder);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	// Route that searches for a boulder problem given boulder id
	app.search<{ Body: { boulderId: number } }>("/boulders", async (req, reply) => {
		const { boulderId: boulderId } = req.body;

		try {
			const boulder = await req.em.find(Boulder, { id: boulderId });
			return reply.send(boulder);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	// Route that updates a boulder problem given boulder id
	app.put<{ Body: IUpdateBoulderBody }>("/boulders", async (req, reply) => {
		const { id, zone, color, score, grade, note } = req.body;

		try {
			const boulder = await req.em.findOneOrFail(Boulder, id, { strict: true });
			boulder.zone = zone;
			boulder.color = color;
			boulder.score = score;
			boulder.grade = grade;
			boulder.note = note;
			await req.em.persistAndFlush(boulder);
			return reply.send(boulder);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	// Route that deletes a boulder problem after checking role
	app.delete<{ Body: { myId: number; bouderId: number } }>(
		"/boulders",
		async (req, reply) => {
			const { myId, bouderId  } = req.body;

			try {
				// Authenticate user's role
				const user = await req.em.findOneOrFail(User, myId, { strict: true });

				// Make sure the requester is an Admin
				if (user.role !== UserRole.JUDGE) {
					return reply.status(401).send({ message: "You are not an judge!" });
				}

				const boulderToDelete = await req.em.findOneOrFail(Boulder, bouderId, { strict: true });
				await req.em.removeAndFlush(boulderToDelete);
				return reply.send();
			} catch (err) {
				return reply.status(500).send({ message: err.message });
			}
		}
	);
}
