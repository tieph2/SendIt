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
	app.get("/boulders", async (req, reply) => {
		try {
			const theBoulder = await req.em.find(Boulder, {});
			reply.send(theBoulder);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

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

	// Search for a boulder problem
	app.search<{ Body: { boulder_id: number } }>("/boulders", async (req, reply) => {
		const { boulder_id } = req.body;

		try {
			const boulder = await req.em.find(Boulder, { id: boulder_id });
			return reply.send(boulder);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	//Update a boulder problem
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

	// Delete a boulder problem after checking user is a  judge
	app.delete<{ Body: { my_id: number; boulder_id: number } }>(
		"/boulders",
		async (req, reply) => {
			const { my_id, boulder_id  } = req.body;

			try {
				// Authenticate my user's role
				const me = await req.em.findOneOrFail(User, my_id, { strict: true });

				// Make sure the requester is an Admin
				if (me.role !== UserRole.JUDGE) {
					return reply.status(401).send({ message: "You are not an judge!" });
				}

				const boulderToDelete = await req.em.findOneOrFail(Boulder, boulder_id, { strict: true });
				await req.em.removeAndFlush(boulderToDelete);
				return reply.send();
			} catch (err) {
				return reply.status(500).send({ message: err.message });
			}
		}
	);
}
