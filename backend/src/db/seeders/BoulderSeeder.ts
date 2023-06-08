import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Boulder } from "../entities/Boulder.js";
import {UploadFileToMinio} from "../../plugins/minio.js";
import path from "path";
import { fileURLToPath } from 'url';
import fs from "fs/promises";






/**
 * This class generates database entries for boulder problems
 */
export class BoulderSeeder extends Seeder {

	async run(em: EntityManager, context: Dictionary): Promise<void> {


// ES Modules argh https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		const __parentdir = path.dirname(__dirname);
		const __granddir = path.dirname(__parentdir);

		for (let i = 1; i <= 3; i++) {
			const image = await fs.readFile(path.resolve(__granddir, 'assets/images', `boulder${i}.jpg`))
				.catch( err =>  {
					console.error(err);
				});
			const file = {
				file: image,
				filename: `boulder${i}.jpg`
			}

			await UploadFileToMinio(file);

		}

		context.boulder1 = em.create(Boulder, {
			zone: 1,
			color: "red",
			score: 1000,
			grade: 1,
			note: "Climbers can't use wall features",
			imgUri: "boulder1.jpg"
		});
		context.boulder2 = em.create(Boulder, {
			zone: 4,
			color: "blue",
			score: 1500,
			grade: 6,
			note: "Dyno move at the start",
			imgUri: "boulder2.jpg"
		});
		context.boulder3 = em.create(Boulder, {
			zone: 6,
			color: "red",
			score: 1000,
			grade: 3,
			note: "Bat-hang",
			imgUri: "boulder3.jpg"
		});
		context.boulder4 = em.create(Boulder, {
			zone: 1,
			color: "blue",
			score: 1000,
			grade: 12,
			note: "Bat-hang",
			imgUri: "boulder3.jpg"
		});
	}
}
